import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmotionModule } from './emotion/emotion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5434,
      database: 'emotiondb',
      username: 'emotion',
      password: 'emotion',
      autoLoadEntities: true,
      synchronize: true, //Somente para prod
    }),
    EmotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
