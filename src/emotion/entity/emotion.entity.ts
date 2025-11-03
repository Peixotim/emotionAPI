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

  @Column({ type: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  constructor(uuid: string, name: string, intensity: number, type: string) {
    this.uuid = uuid;
    this.name = name;
    this.intensity = intensity;
    this.type = type;
    this.createdAt = new Date();
  }
}
