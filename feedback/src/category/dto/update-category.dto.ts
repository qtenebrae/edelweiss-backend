import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
	@IsInt()
	@ApiProperty()
	id: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;
}
