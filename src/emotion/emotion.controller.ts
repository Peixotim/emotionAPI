import { Controller } from '@nestjs/common';
import { EmotionService } from './emotion.service';

@Controller('emotion')
export class EmotionController {
  constructor(private readonly emotionServices: EmotionService) {}
}
