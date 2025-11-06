import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { Emotion } from './entity/emotion.entity';
import { EmotionCreate } from './DTOs/emotion.create.dto';
import { ModifyName } from './DTOs/emotion.modifyName.dto';
import { RequestOne } from './DTOs/emotion.requestOne.dto';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timer-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';

@Controller('emotion')
@UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor)
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

  @Get(':name')
  public async findByName(@Param('name') name: RequestOne): Promise<Emotion> {
    return this.emotionService.findByName(name);
  }

  @Patch(':uuid')
  public async modifyName(
    @Body() request: ModifyName,
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ) {
    return this.emotionService.modifyName(uuid, request);
  }
}
