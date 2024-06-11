import { Controller } from '@nestjs/common';
import { RatingService } from './rating.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService) {}

	@MessagePattern({ cmd: 'feedback-update-rating-request' })
	async calculateRating(@Payload() id: number) {
		return this.ratingService.calculateRating();
	}
}
