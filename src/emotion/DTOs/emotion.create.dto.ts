import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';

export class EmotionCreate {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsNotEmpty()
  intensity: number;

  @IsDate()
  @IsOptional()
  dateCreation: string;

  constructor(
    uuid: string,
    name: string,
    dateCreation: string,
    intensity: number,
  ) {
    this.uuid = uuid;
    this.name = name;
    this.dateCreation = dateCreation;
    this.intensity = intensity;
  }
}
