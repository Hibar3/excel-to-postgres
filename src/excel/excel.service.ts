import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
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
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
  
    // Convert sheet to JSON
    const rawData: any[] = XLSX.utils.sheet_to_json(sheet);
  
    // Map and format the data
    const formattedData = rawData.map(row => ({
      status: row.status || 'Active',
      date: row.date ? new Date(row.date) : new Date(),
      consultant: row.consultant || '',
      added_by: row.added_by || '',
      source: row.source || '',
      plant_origin: row.plant_origin || '',
      product_grade_number: row.product_grade_number || '',
      product_detailed: row.product_detailed || '',
      quality: row.quality || '',
      deal_type: row.deal_type || '',
      currency: row.currency || '',
      original_currency: row.original_currency || '',
      usd: row.usd ? parseFloat(row.usd.toString().replace(/,/g, '')) : null,
      vat: row.vat || '',
      vat_percentage: row.vat_percentage || '',
      qualified: row.qualified || '',
      payment_term: row.payment_term || '',
      delivery_term: row.delivery_term || '',
      info_source: row.info_source || '',
      comment_to_publish: row.comment_to_publish || '',
      country_of_destination: row.country_of_destination || '',
      country_of_origin: row.country_of_origin || '',
      product_main_group: row.product_main_group || '',
      product_group: row.product_group || '',
      weight_unit: row.weight_unit || '',
      PlantId: row.PlantId || null,
      last_updated_by: row.last_updated_by || null
    }));
  
    // Validate the data
    const validData = formattedData.filter(row => 
      row.product_detailed && row.currency && row.plant_origin
    );
  
    if (validData.length === 0) {
      throw new BadRequestException('No valid data found in the Excel file');
    }
  
    // Insert data into the database
    try {
      await this.excelDataRepository.save(validData);
      return {
        message: 'Price assessment data imported successfully',
        count: validData.length
      };
    } catch (error) {
      throw new BadGatewayException(`Failed to save data: ${error.message}`);
    }
  }
  
  
}
