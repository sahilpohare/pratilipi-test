import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateInteractionDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsEnum(['like', 'dislike'])
    interaction_type: string;

    @IsNotEmpty()
    @IsNumber()
    resource_id: number;
}
