import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Student } from '../../student/student.entity';
import { Course } from '../../course/course.entity';
import { Session } from '../../session/session.entity';
import { Semester } from '../../semester/semester.entity';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.results)
  student: Student;

  @OneToMany(() => Course, (course) => course)
  courses: Course[];

  @Column({ type: 'varchar' }) // Ensure session is a string
  session: string; // '2022/2023'

  @Column({ type: 'varchar' })
  semester: string;

  @Column({ nullable: true })
  gpa?: number;

  @Column({ nullable: true })
  cgpa?: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
