import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteStatusDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
