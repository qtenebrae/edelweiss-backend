import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [GenreController],
	providers: [GenreService],
	imports: [DatabaseModule],
})
export class GenreModule {}
