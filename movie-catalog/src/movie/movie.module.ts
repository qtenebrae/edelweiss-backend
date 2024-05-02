import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [MovieController],
	providers: [MovieService],
	imports: [DatabaseModule],
})
export class MovieModule {}
