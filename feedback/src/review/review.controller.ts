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
import { ReviewService } from './review.service';
import { Review } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/delete-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(@Body(new ValidationPipe()) createReviewDto: CreateReviewDto): Promise<Review> {
		return this.reviewService.create(createReviewDto);
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Review[]> {
		return this.reviewService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Review> {
		const reviewExists = await this.reviewService.findById(Number(id));
		if (!reviewExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return reviewExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(@Body(new ValidationPipe()) updateReviewDto: UpdateReviewDto): Promise<Review> {
		const reviewExists = await this.reviewService.findById(Number(updateReviewDto.id));
		if (!reviewExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.reviewService.update({
			where: { id: updateReviewDto.id },
			data: updateReviewDto,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(@Body(new ValidationPipe()) deleteReviewDto: DeleteReviewDto): Promise<Review> {
		const reviewExists = await this.reviewService.findById(Number(deleteReviewDto.id));
		if (!reviewExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.reviewService.delete({ id: deleteReviewDto.id });
	}

	@MessagePattern({ cmd: 'catalog--feedback-for-movie-request' })
	async getReviewsByModieId(@Payload() id: number): Promise<Review[]> {
		return this.reviewService.getReviewsByModieId(Number(id));
	}
}
