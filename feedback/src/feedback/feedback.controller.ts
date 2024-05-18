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
import { FeedbackService } from './feedback.service';
import { Feedback } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { DeleteFeedbackDto } from './dto/delete-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedback')
@ApiTags('Feedback')
export class FeedbackController {
	constructor(private readonly feedbackService: FeedbackService) {}

	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async create(
		@Body(new ValidationPipe()) createFeedbackDto: CreateFeedbackDto,
	): Promise<Feedback> {
		return this.feedbackService.create(createFeedbackDto);
	}

	@Get('findAll')
	@HttpCode(HttpStatus.OK)
	async findAll(): Promise<Feedback[]> {
		return this.feedbackService.findAll();
	}

	@Get('findById/:id')
	@HttpCode(HttpStatus.OK)
	async findById(@Param('id') id: number): Promise<Feedback> {
		const feedbackExists = await this.feedbackService.findById(Number(id));
		if (!feedbackExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return feedbackExists;
	}

	@Put('update')
	@HttpCode(HttpStatus.OK)
	async update(
		@Body(new ValidationPipe()) updateFeedbackDto: UpdateFeedbackDto,
	): Promise<Feedback> {
		const feedbackExists = await this.feedbackService.findById(Number(updateFeedbackDto.id));
		if (!feedbackExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.feedbackService.update({
			where: { id: updateFeedbackDto.id },
			data: updateFeedbackDto,
		});
	}

	@Delete('delete')
	@HttpCode(HttpStatus.OK)
	async delete(
		@Body(new ValidationPipe()) deleteFeedbackDto: DeleteFeedbackDto,
	): Promise<Feedback> {
		const feedbackExists = await this.feedbackService.findById(Number(deleteFeedbackDto.id));
		if (!feedbackExists) {
			throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
		}

		return this.feedbackService.delete({ id: deleteFeedbackDto.id });
	}
}
