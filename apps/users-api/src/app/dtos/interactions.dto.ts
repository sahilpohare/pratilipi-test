import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddInteractionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(['like', 'dislike'])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  resourceId: string;
}

export class RemoveInteractionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  resourceId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  userId: string;
}

export class GetInteractionsCountForPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  postId: string;
}

export class InteractionsCount {
  likes: number;
  dislikes: number;
}
