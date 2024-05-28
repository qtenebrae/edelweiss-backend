import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteReviewDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
