import { Board } from 'src/boards/board.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  bio: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ default: true, name: 'encrypted_password' })
  encryptedPassword: string;

  @CreateDateColumn({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => Board)
  @JoinColumn({ name: 'board_id' })
  board: Board;
}
