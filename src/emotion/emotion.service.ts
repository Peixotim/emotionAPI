import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Emotion } from './entity/emotion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EmotionCreate } from './DTOs/emotion.create.dto';
import { HttpStatus } from '@nestjs/common';
import { RequestOne } from './DTOs/emotion.requestOne.dto';
import { ModifyName } from './DTOs/emotion.modifyName.dto';

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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findAll(): Promise<Emotion[]> {
    const emotions: Emotion[] = await this.emotionRepository.find();

    if (emotions.length === 0) {
      throw new HttpException(
        `Error, there is no emotion registered in our database !`,
        HttpStatus.NOT_FOUND,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async findByName(request: RequestOne): Promise<Emotion> {
    const findOne = await this.emotionRepository.findOneBy({
      name: request.name,
    });
    if (findOne === null) {
      throw new HttpException(
        `Error, there is no emotion registered in our database !`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return findOne;
    } catch (error) {
      console.error(
        '[EmotionService][findOnes] Error:',
        error instanceof Error
          ? {
              message: error.message,
              stack: error.stack,
            }
          : error,
      );

      throw new HttpException(
        `Failure to seek an emotion ${error instanceof Error ? error.message : 'unknown error'}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async modifyName(uuid: string, request: ModifyName): Promise<Emotion> {
    const findOne = await this.emotionRepository.findOneBy({
      uuid: uuid,
    });

    if (findOne === null) {
      throw new HttpException(
        `Emotion with this UUID : ${uuid} was not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      findOne.name = request.newName;
      const saved = await this.emotionRepository.save(findOne);
      return saved;
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
