import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;
}
