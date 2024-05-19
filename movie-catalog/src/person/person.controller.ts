import {
	Body,
	Controller,
	Delete,
	forwardRef,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
	Param,
	Post,
	Put,
	ValidationPipe,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { DeletePersonDto } from './dto/delete-person.dto';
import { SexService } from 'src/sex/sex.service';

@Controller('person')
@ApiTags('Person')
export class PersonController {
	constructor(
		private readonly personService: PersonService,
		@Inject(forwardRef(() => SexService)) private readonly sexService: SexService,
	) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createPersonDto: CreatePersonDto): Promise<Person> {
		const sexExists = await this.sexService.findById(Number(createPersonDto.sexId));
		if (!sexExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.personService.create({
			firstname: createPersonDto.firstname,
			lastname: createPersonDto.lastname,
			middlename: createPersonDto.middlename,
			birthday: createPersonDto.birthday,
			dateOfDeath: createPersonDto.dateOfDeath,
			sex: {
				connect: { id: Number(createPersonDto.sexId) },
			},
		});
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Person[]> {
		return this.personService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Person> {
		const personExists = await this.personService.findById(Number(id));
		if (!personExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return personExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updatePersonDto: UpdatePersonDto): Promise<Person> {
		const personExists = await this.personService.findById(Number(updatePersonDto.id));
		if (!personExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		if (updatePersonDto.sexId !== undefined) {
			const sexExists = await this.sexService.findById(Number(updatePersonDto.sexId));
			if (!sexExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}
		return this.personService.update({
			where: { id: updatePersonDto.id },
			data: updatePersonDto,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deletePersonDto: DeletePersonDto): Promise<Person> {
		const personExists = await this.personService.findById(Number(deletePersonDto.id));
		if (!personExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.personService.delete({ id: deletePersonDto.id });
	}
}
