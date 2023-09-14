import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDateString, IsOptional } from "class-validator";

export class CreatePostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title : string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    story: string;

    @IsOptional()
    @ApiProperty()
    @IsDateString()
    published?: Date;
}