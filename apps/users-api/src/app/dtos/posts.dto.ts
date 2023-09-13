import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString } from "class-validator";

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    story: string;
    
    @ApiProperty()
    @IsDateString()
    published?: Date;
}