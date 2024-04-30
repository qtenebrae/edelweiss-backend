import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeletePersonDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
