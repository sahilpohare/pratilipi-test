import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateInteractionDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsEnum(['like', 'dislike'])
    interactionType: string;

    @IsNotEmpty()
    @IsNumber()
    resourceId: number;
}
