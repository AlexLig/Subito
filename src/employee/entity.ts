import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employer } from '../employer/entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 9, unique: true })
  vat: string;

  @Column('time')
  startWork: string;

  @Column('time')
  endWork: string;

  @ManyToOne(type => Employer, employer => employer.employees, {
    onDelete: 'CASCADE',
  })
  employer: Employer;
}
