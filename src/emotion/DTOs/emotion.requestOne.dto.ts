import { IsNotEmpty, IsString } from 'class-validator';

export class RequestOne {
  @IsString()
  @IsNotEmpty()
  name: string;
}
