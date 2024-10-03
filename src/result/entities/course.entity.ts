import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Result } from './result.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courseCode: string;

  @Column()
  courseTitle: string;

  @Column()
  unit: number;

  @Column()
  score: number;

  @Column()
  grade: string;

  @ManyToOne(() => Result, (result) => result.courses)
  result: Result;
}
