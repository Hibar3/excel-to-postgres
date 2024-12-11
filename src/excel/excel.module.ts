import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './excel.controller';
import { ExcelService } from './excel.service';
import { ExcelData } from './excel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExcelData])],
  controllers: [UploadController], // Register the controller here
  providers: [ExcelService], // Register the service here
})
export class ExcelModule {}
