import { IsString, MaxLength } from 'class-validator';

export class CreateBoardMessageDto {
  @IsString()
  @MaxLength(150)
  content: string;
}
