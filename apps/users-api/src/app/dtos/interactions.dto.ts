import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddInteractionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(['like', 'dislike'])
  interaction_type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  resource_id: number;
}

export class RemoveInteractionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  resource_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  user_id: string;
}

export class GetInteractionsCountForPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  post_id: string;
}

export class InteractionsCount {
  likes: number;
  dislikes: number;
}
