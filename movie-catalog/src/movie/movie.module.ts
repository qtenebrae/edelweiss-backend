import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { DatabaseModule } from 'src/database/database.module';
import { StatusModule } from 'src/status/status.module';
import { TypeModule } from 'src/type/type.module';

@Module({
	controllers: [MovieController],
	providers: [MovieService],
	imports: [DatabaseModule, StatusModule, TypeModule],
	exports: [MovieService],
})
export class MovieModule {}
