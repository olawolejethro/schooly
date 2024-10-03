import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Semester {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  semesterName: string;
}
