import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Result } from '../result/result.entity';

@Entity()
export class Student {
  @PrimaryColumn('character varying')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];
}
