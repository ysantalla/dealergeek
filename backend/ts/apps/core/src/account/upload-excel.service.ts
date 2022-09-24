import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { QueueName, QueueType } from './account.enum';

import * as xlsx from 'xlsx';

@Injectable()
export class UploadExcelService {
  logger = new Logger(UploadExcelService.name);

  constructor(@InjectQueue(QueueName.SynchronizeData) private queue: Queue) {}

  async uploadExcel(excel: Buffer): Promise<any> {
    try {
      await this.queue.add(QueueType.UploadExcel, {
        excel,
      });
      return { success: true };
    } catch (error) {
      this.logger.error(error);
      return { success: false };
    }
  }
}
