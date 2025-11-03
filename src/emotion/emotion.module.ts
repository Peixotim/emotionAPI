import { Module } from '@nestjs/common';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './entity/emotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion])],
  controllers: [EmotionController],
  providers: [EmotionService],
})
export class EmotionModule {}
