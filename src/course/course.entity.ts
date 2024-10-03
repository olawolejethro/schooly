import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
