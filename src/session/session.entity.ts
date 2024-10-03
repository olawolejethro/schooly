import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  sessionYear: String; // E.g., "2021/2022"
}
