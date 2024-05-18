import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [FeedbackController],
	providers: [FeedbackService],
	imports: [DatabaseModule],
})
export class FeedbackModule {}
