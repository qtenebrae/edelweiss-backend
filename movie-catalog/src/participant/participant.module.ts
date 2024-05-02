import { Module } from '@nestjs/common';
import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [ParticipantController],
	providers: [ParticipantService],
	imports: [DatabaseModule],
})
export class ParticipantModule {}
