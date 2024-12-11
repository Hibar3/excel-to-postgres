import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExcelModule } from './excel/excel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'excel',
      autoLoadEntities: true,
      synchronize: true, // Don't use in production!
    }),
    ExcelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
