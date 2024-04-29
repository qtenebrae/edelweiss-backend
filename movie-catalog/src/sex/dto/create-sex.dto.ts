import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSexDto {
	@IsString()
	@ApiProperty()
	title: string;
}
