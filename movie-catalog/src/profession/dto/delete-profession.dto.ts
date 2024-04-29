import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteProfessionDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
