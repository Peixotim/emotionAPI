import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Emotion } from './entity/emotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmotionCreate } from './DTOs/emotion.create.dto';
import { HttpStatusCode } from 'axios';

@Injectable()
export class EmotionService {
  constructor(
    @InjectRepository(Emotion)
    private readonly emotionRepository: Repository<Emotion>,
  ) {}

  public async create(create: EmotionCreate): Promise<Emotion> {
    try {
      const newEmotion: Emotion = this.emotionRepository.create(create);
      const savedEmotion: Emotion =
        await this.emotionRepository.save(newEmotion);

      return savedEmotion;
    } catch (error: unknown) {
      console.error(
        '[EmotionService][create] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );
      throw new HttpException(
        `Failure to create a new emotion ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatusCode.InternalServerError,
      );
    }
  }

  public async findAll(): Promise<Emotion[]> {
    const emotions: Emotion[] = await this.emotionRepository.find();

    if (emotions.length === 0) {
      throw new HttpException(
        `Error, there is no emotion registered in our database !`,
        HttpStatusCode.NotFound,
      );
    }

    try {
      return emotions;
    } catch (error: unknown) {
      console.error(
        '[EmotionService][find] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failure to seek emotions ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
