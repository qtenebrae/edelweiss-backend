import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	title: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	alternativeTitle: string;

	@IsNotEmpty()
	@ApiProperty()
	release: Date;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	description: string;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	rating: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty()
	duration: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	numberOfEpisodes: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	ageLimit: number;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	posterUrl: string;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	typeId: number;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	statusId: number;

	@ApiProperty()
	@IsOptional()
	genresId?: number[];

	@ApiProperty()
	@IsOptional()
	countriesId?: number[];
}
