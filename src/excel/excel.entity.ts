import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cf_aka_territories')
export class ExcelData {
    @PrimaryGeneratedColumn() // Optional if your table has an ID
    id?: number;
  
    @Column({ type: 'varchar', length: 250, nullable: false })
    aka: string;
  
    @Column({ type: 'varchar', length: 250, nullable: true })
    territory: string;
  
    @Column({ type: 'varchar', length: 250, nullable: false })
    fileId: string;
}