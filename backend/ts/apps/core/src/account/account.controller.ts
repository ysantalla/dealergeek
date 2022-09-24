import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadExcelService } from './upload-excel.service';

@Controller('upload')
export class AccountController {
  constructor(private uploadExcelService: UploadExcelService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.uploadExcelService.uploadExcel(file.buffer);
  }
}
