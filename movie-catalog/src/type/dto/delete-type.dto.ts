import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteTypeDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
