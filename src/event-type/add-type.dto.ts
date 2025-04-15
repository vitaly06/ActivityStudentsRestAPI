import { IsNotEmpty, IsString } from 'class-validator';

export class AddEventTypeDto {
  @IsNotEmpty()
  @IsString()
  typeName: string;
}
