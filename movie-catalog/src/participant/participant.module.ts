import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { DatabaseModule } from 'src/database/database.module';
import { ProfessionModule } from 'src/profession/profession.module';
import { MovieModule } from 'src/movie/movie.module';
import { PersonModule } from 'src/person/person.module';

@Module({
	controllers: [ParticipantController],
	providers: [ParticipantService],
	imports: [DatabaseModule, ProfessionModule, MovieModule, PersonModule],
})
export class ParticipantModule {}
