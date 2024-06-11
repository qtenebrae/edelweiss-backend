import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePersonDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstname: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	lastname: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	middlename: string;

	@IsNotEmpty()
	@ApiProperty()
	birthday: Date;

	@IsNotEmpty()
	@ApiProperty()
	@IsOptional()
	dateOfDeath: Date;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	photoUrl: string;

	@IsInt()
	@ApiProperty()
	sexId: number;
}
