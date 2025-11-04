import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'float', nullable: false })
  intensity: number;

  @Column({ type: 'varchar' })
  type: string;

  @CreateDateColumn()
  createdAt: Date;
}
