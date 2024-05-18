import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteCategoryDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
