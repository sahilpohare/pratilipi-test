import { UploadedFile } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UploadDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'File to be uploaded', // Describe the field
  })
  @IsNotEmpty()
  file: any;
}
