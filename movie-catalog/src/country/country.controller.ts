import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { DeleteCountryDto } from './dto/delete-country.dto';

@Controller('country')
@ApiTags('Country')
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createCountryDto: CreateCountryDto): Promise<Country> {
		return this.countryService.create({ title: createCountryDto.title });
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Country[]> {
		return this.countryService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Country> {
		const countryExists = await this.countryService.findById(Number(id));
		if (!countryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return countryExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateCountryDto: UpdateCountryDto): Promise<Country> {
		const countryExists = await this.countryService.findById(Number(updateCountryDto.id));
		if (!countryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.countryService.update({
			where: { id: updateCountryDto.id },
			data: { title: updateCountryDto.title },
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteCountryDto: DeleteCountryDto): Promise<Country> {
		const countryExists = await this.countryService.findById(Number(deleteCountryDto.id));
		if (!countryExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.countryService.delete({ id: deleteCountryDto.id });
	}
}
