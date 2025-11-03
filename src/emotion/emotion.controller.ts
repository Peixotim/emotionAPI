import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { Emotion } from './entity/emotion.entity';
import { EmotionCreate } from './DTOs/emotion.create.dto';

@Controller('emotion')
export class EmotionController {
  constructor(private readonly emotionService: EmotionService) {}

  @Post()
  public async create(@Body() request: EmotionCreate): Promise<Emotion> {
    return this.emotionService.create(request);
  }
  @Get()
  public async find(): Promise<Emotion[]> {
    return this.emotionService.findAll();
  }
}
