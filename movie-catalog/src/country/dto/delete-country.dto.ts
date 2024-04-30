import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class DeleteCountryDto {
	@IsInt()
	@ApiProperty()
	id: number;
}
