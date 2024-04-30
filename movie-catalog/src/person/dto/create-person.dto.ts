import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreatePersonDto {
	@IsString()
	@ApiProperty()
	firstname: string;

	@IsString()
	@ApiProperty()
	lastname: string;

	@IsString()
	@ApiProperty()
	middlename: string;

	@ApiProperty()
	birthday: Date;

	@ApiProperty()
	dateOfDeath: Date;

	@IsInt()
	@ApiProperty()
	sexId: number;
}
