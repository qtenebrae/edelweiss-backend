import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteFeedbackDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
