import { IsNotEmpty, IsString } from 'class-validator';

export class ModifyName {
  @IsString()
  @IsNotEmpty()
  newName: string;
}
