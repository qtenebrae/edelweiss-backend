import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTypeDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;
}
