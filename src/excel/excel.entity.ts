import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('price_assessments')
export class ExcelData {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    status: string;

    @Column({ type: 'timestamp', nullable: true })
    date: Date;

    @Column({ type: 'varchar', length: 100, nullable: true })
    consultant: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    added_by: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    source: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    plant_origin: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    product_grade_number: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    product_detailed: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    quality: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    deal_type: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    currency: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    original_currency: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    usd: number;

    @Column({ type: 'varchar', length: 20, nullable: true })
    vat: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    vat_percentage: string;

    @Column({ type: 'varchar', length: 5, nullable: true })
    qualified: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    payment_term: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    delivery_term: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    info_source: string;

    @Column({ type: 'text', nullable: true })
    comment_to_publish: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    country_of_destination: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    country_of_origin: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    product_main_group: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    product_group: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    weight_unit: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'integer', nullable: true })
    last_updated_by: number;

    @Column({ type: 'integer', nullable: true })
    PlantId: number;
}