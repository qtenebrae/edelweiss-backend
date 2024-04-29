import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteSexDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
