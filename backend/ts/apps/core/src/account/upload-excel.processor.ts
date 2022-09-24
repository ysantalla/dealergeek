import {
  Processor,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';
import { QueueName, QueueType } from './account.enum';

import * as xlsx from 'xlsx';
import { AccountService } from './account.service';

interface ExcelRow {
  AcctType: string;
  Account: string;
  Description: string;
  Department: string;
  TypicalBal: string;
  DebitOffset?: string;
  CreditOffset?: string;
}

@Processor(QueueName.SynchronizeData)
export class UploadExcelProcessor {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private accountService: AccountService) {}

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job, result: any) {
    this.logger.debug(`Completed job ${job.id} of type ${job.name}.`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this.logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }

  @Process(QueueType.UploadExcel)
  async uploadFile(
    job: Job<{
      excel: any;
    }>,
  ): Promise<any> {
    this.logger.log(`Synchronize excel file`);

    const file = xlsx.read(job.data.excel.data, {
      type: 'buffer',
    });

    let data = Object.keys(file.Sheets).map((name) => ({
      name: name,
      data: xlsx.utils.sheet_to_json(file.Sheets[name]) as ExcelRow[],
    }));

    const request = [];

    for (const sheet of data) {
      let i = 2;
      for (const item of sheet.data) {
        if (
          item.AcctType &&
          item.Account &&
          item.Description &&
          item.Department &&
          item.TypicalBal
        ) {
          const mapItem = {
            activeType: item.AcctType,
            account: item.Account,
            description: item.Description,
            departament: item.Department,
            typicalBalance: item.TypicalBal,
            debitOffset: item.DebitOffset,
            creditOffset: item.CreditOffset,
            position: i,
            sheet: sheet.name,
          };

          this.logger.log(mapItem);
          if (item) {
            request.push(this.accountService.create(mapItem));
          }
        }
        i++;
      }

      // Failed insert, process here
      const allSettled = await Promise.allSettled(request);
      // this.logger.log(JSON.stringify(allSettled));
    }
  }
}
