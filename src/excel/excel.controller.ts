import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExcelService } from './excel.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.excelService.processExcel(file);
  }

  @Get('url')
  async getExcel() {
    return { "message": "Excel data fetched successfully" };
  }
}
