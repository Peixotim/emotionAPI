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

  @Column({ type: 'number', nullable: false })
  intensity: number;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'date' })
  @CreateDateColumn()
  createdAt: Date;

  constructor(
    uuid: string,
    name: string,
    intesity: number,
    type: string,
    createdAt: Date,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.intensity = intesity;
    this.type = type;
    this.createdAt = createdAt;
  }
}
