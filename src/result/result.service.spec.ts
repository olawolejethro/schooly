import { Test, TestingModule } from '@nestjs/testing';
import { ResultService } from './result.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Student } from '../student/student.entity';
import { Repository } from 'typeorm';
import { StudentService } from '../student/student.service';
import { QueueService } from './queue/result.queue';
import { BadRequestException } from '@nestjs/common';

describe('ResultService', () => {
  let service: ResultService;
  let resultRepository: Repository<Result>;
  let studentRepository: Repository<Student>;
  let studentService: StudentService;
  let queueService: QueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultService,
        {
          provide: getRepositoryToken(Result),
          useClass: Repository, // Mock the Result repository
        },
        {
          provide: getRepositoryToken(Student),
          useClass: Repository, // Mock the Student repository
        },
        {
          provide: StudentService,
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: QueueService,
          useValue: {
            addBulkJob: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ResultService>(ResultService);
    resultRepository = module.get<Repository<Result>>(
      getRepositoryToken(Result),
    );
    studentRepository = module.get<Repository<Student>>(
      getRepositoryToken(Student),
    );
    studentService = module.get<StudentService>(StudentService);
    queueService = module.get<QueueService>(QueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processResult', () => {
    const createResultDto = {
      studentId: 'S123456',
      name: 'John Doe',
      session: '2022/2023',
      semester: 'First',
      courses: [
        {
          courseCode: 'CS101',
          courseTitle: 'Introduction to Computer Science',
          unit: 3,
          score: 85,
          grade: 'A',
        },
      ],
      gpa: 3.8,
      cgpa: 3.7,
    };

    it('should create a new result if student exists', async () => {
      // Arrange
      const mockStudent = { id: 1, studentId: 'S123456', name: 'John Doe' };
      const mockResult = { id: 1, ...createResultDto, student: mockStudent };

      jest.spyOn(studentService, 'findOne').mockResolvedValue(mockStudent); // Mock the student search
      jest.spyOn(resultRepository, 'create').mockReturnValue(mockResult); // Mock result creation
      jest.spyOn(resultRepository, 'save').mockResolvedValue(mockResult); // Mock result saving

      // Act
      const result = await service.processResult(createResultDto);

      // Assert
      expect(result).toEqual(mockResult);
      expect(studentService.findOne).toHaveBeenCalledWith(
        createResultDto.studentId,
      );
      expect(resultRepository.create).toHaveBeenCalledWith({
        student: mockStudent,
        session: createResultDto.session,
        semester: createResultDto.semester,
        courses: createResultDto.courses,
        gpa: createResultDto.gpa,
        cgpa: createResultDto.cgpa,
      });
      expect(resultRepository.save).toHaveBeenCalledWith(mockResult);
    });

    it('should create a new student if student does not exist', async () => {
      // Arrange
      const newStudent = { id: 1, studentId: 'S123456', name: 'John Doe' };
      const mockResult = { id: 1, ...createResultDto, student: newStudent };

      jest.spyOn(studentService, 'findOne').mockResolvedValue(null); // Student not found
      jest.spyOn(studentService, 'create').mockResolvedValue(newStudent); // Mock student creation
      jest.spyOn(resultRepository, 'create').mockReturnValue(mockResult); // Mock result creation
      jest.spyOn(resultRepository, 'save').mockResolvedValue(mockResult); // Mock result saving

      // Act
      const result = await service.processResult(createResultDto);

      // Assert
      expect(result).toEqual(mockResult);
      expect(studentService.create).toHaveBeenCalledWith({
        studentId: createResultDto.studentId,
        name: createResultDto.name,
      });
      expect(resultRepository.create).toHaveBeenCalledWith({
        student: newStudent,
        session: createResultDto.session,
        semester: createResultDto.semester,
        courses: createResultDto.courses,
        gpa: createResultDto.gpa,
        cgpa: createResultDto.cgpa,
      });
      expect(resultRepository.save).toHaveBeenCalledWith(mockResult);
    });

    it('should throw BadRequestException if saving student fails', async () => {
      // Arrange
      jest.spyOn(studentService, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(studentService, 'create')
        .mockRejectedValue(new Error('Failed to save student'));

      // Act & Assert
      await expect(service.processResult(createResultDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(studentService.create).toHaveBeenCalled();
    });

    it('should throw BadRequestException if saving result fails', async () => {
      // Arrange
      const mockStudent = { id: 1, studentId: 'S123456', name: 'John Doe' };

      jest.spyOn(studentService, 'findOne').mockResolvedValue(mockStudent); // Student found
      jest
        .spyOn(resultRepository, 'save')
        .mockRejectedValue(new Error('Failed to save result'));

      // Act & Assert
      await expect(service.processResult(createResultDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(resultRepository.save).toHaveBeenCalled();
    });
  });

  describe('processBulk', () => {
    it('should add bulk job to the queue', async () => {
      // Arrange
      const mockFile = {
        mimetype: 'text/csv',
        buffer: Buffer.from('data'),
      } as Express.Multer.File;

      // Act
      const result = await service.processBulk(mockFile);

      // Assert
      expect(result).toEqual({ message: 'Bulk data is being processed.' });
      expect(queueService.addBulkJob).toHaveBeenCalledWith(mockFile);
    });
  });
});
