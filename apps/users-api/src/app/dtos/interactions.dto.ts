import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddInteractionDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(['like', 'dislike'])
  type: string;

  @IsNotEmpty()
  @IsInt()
  resourceId: string;

  @IsNotEmpty()
  @IsInt()
  userId: string;
}

export class RemoveInteractionDto {
  @IsNotEmpty()
  @IsInt()
  resourceId: string;

  @IsNotEmpty()
  @IsInt()
  userId: string;
}

export class GetInteractionsCountForPostDto {
  @IsNotEmpty()
  @IsInt()
  postId: string;
}

export class InteractionsCount {
  likes: number;
  dislikes: number;
}