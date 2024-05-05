import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	login: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	password: string;
}
