import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfessionDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;
}
