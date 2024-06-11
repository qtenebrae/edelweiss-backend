import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RatingModule } from './rating/rating.module';

@Module({
	imports: [ConfigModule.forRoot(), RatingModule],
})
export class AppModule {}
