import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dtos/create-student.dto';
import { UpdateStudentDto } from './dtos/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create();
    student.id = createStudentDto.studentId;
    student.name = createStudentDto.name;
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['results'] });
  }

  async findOne(id: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });
    return student;
  }

  // async update(
  //   id: number,
  //   updateStudentDto: UpdateStudentDto,
  // ): Promise<Student> {
  //   const student = await this.studentRepository.preload({
  //     id,
  //     ...updateStudentDto,
  //   });
  //   if (!student) {
  //     throw new NotFoundException(`Student with ID ${id} not found`);
  //   }
  //   return this.studentRepository.save(student);
  // }

  // async remove(id: number): Promise<void> {
  //   const student = await this.findOne(id);
  //   await this.studentRepository.remove(student);
  // }
}
