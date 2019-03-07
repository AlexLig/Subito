import { Employer } from '../employer/entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// import { Employer } from 'src/employer/employer.entity';
import { Expose } from 'class-transformer';

@Entity()
export class Employee {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column({ length: 500 })
  name: string;

  @Expose()
  @Column({ length: 9, unique: true })
  vat: string;

  @Expose()
  @Column('time')
  startWork: string;

  @Expose()
  @Column('time')
  endWork: string;

  @Expose()
  @ManyToOne(type => Employer, employer => employer.employees, {
    onDelete: 'CASCADE',
  })
  employer: Employer;
}
