import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { DatabaseModule } from 'src/database/database.module';
import { SexModule } from 'src/sex/sex.module';

@Module({
	controllers: [PersonController],
	providers: [PersonService],
	imports: [DatabaseModule, SexModule],
	exports: [PersonService],
})
export class PersonModule {}
