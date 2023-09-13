import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Unique } from 'typeorm';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Unique(['name'])
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
