import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteHistoryDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
