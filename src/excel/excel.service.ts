
import { Injectable, Logger } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExcelData } from './excel.entity';

@Injectable()
export class ExcelService {
  constructor(
    @InjectRepository(ExcelData)
    private readonly excelDataRepository: Repository<ExcelData>,
  ) {}

  // async processExcel(file: Express.Multer.File) {
  //   Logger.log('Processing Excel file');
  //   const workbook = XLSX.read(file.buffer, { type: 'buffer' });
  //   const sheetName = workbook.SheetNames[0];
  //   const sheet = workbook.Sheets[sheetName];
  //   const data: any[] = XLSX.utils.sheet_to_json(sheet);

  //   // Insert into database
  //   await this.excelDataRepository.save(data);
  //   return { message: 'Excel data imported successfully', data };
  // }

  async processExcel(file: Express.Multer.File) {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
  
    // Convert sheet to JSON
    const data: any[] = XLSX.utils.sheet_to_json(sheet);
  
    // Map fields, standardize to lowercase, and prepare data for insertion
    const formattedData = data.map((row) => ({
      aka: row['aka']?.trim().toLowerCase() || '', // Ensure lowercase and no null
      territory: row['territory']?.trim().toLowerCase() || '', // Ensure lowercase and no null
      fileId: 'fileD', // Set fileId for all rows
    }));
  
    // Validate the data to avoid null or empty aka
    const validData = formattedData.filter((row) => row.aka);
  
    if (validData.length <= 0) {
      throw new Error('No valid data found in the Excel file.');
    }
  
    // Delete old entries with fileId 'fileD' before inserting
    await this.excelDataRepository.delete({ fileId: 'fileD' });
  
    // Insert data into the existing table
    await this.excelDataRepository.save(validData);
  
    return {
      message: 'Data inserted into CF_AKA_Territories successfully',
      data: validData,
    };
  }
  
  
}
