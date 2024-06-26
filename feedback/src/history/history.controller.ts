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
import { HistoryService } from './history.service';
import { History } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateHistoryDto } from './dto/create-history.dto';
import { DeleteHistoryDto } from './dto/delete-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { CategoryService } from 'src/category/category.service';

@Controller('history')
@ApiTags('History')
export class HistoryController {
	constructor(
		private readonly historyService: HistoryService,
		@Inject(forwardRef(() => CategoryService)) private readonly categoryService: CategoryService,
	) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createHistoryDto: CreateHistoryDto): Promise<History> {
		const categoryExists = await this.categoryService.findById(Number(createHistoryDto.categoryId));
		if (!categoryExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.historyService.create({
			movieId: createHistoryDto.movieId,
			score: createHistoryDto.score,
			numberOfEpisodes: createHistoryDto.numberOfEpisodes,
			authorId: createHistoryDto.authorId,
			category: {
				connect: {
					id: Number(createHistoryDto.categoryId),
				},
			},
		});
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<History[]> {
		return this.historyService.findAll();
	}

	@Post('findWhere')
	@HttpCode(HttpStatus.OK)
	async findWhere(@Body() data: { authorId: string; movieId: number }): Promise<History[]> {
		return this.historyService.findWhere(data);
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<History> {
		const historyExists = await this.historyService.findById(Number(id));
		if (!historyExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return historyExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateHistoryDto: UpdateHistoryDto): Promise<History> {
		const historyExists = await this.historyService.findById(Number(updateHistoryDto.id));
		if (!historyExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		if (updateHistoryDto.categoryId !== undefined) {
			const categoryExists = await this.categoryService.findById(
				Number(updateHistoryDto.categoryId),
			);
			if (!categoryExists) {
				throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
			}
		}

		return this.historyService.update({
			where: { id: updateHistoryDto.id },
			data: updateHistoryDto,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteHistoryDto: DeleteHistoryDto): Promise<History> {
		const historyExists = await this.historyService.findById(Number(deleteHistoryDto.id));
		if (!historyExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.historyService.delete({ id: deleteHistoryDto.id });
	}
}
