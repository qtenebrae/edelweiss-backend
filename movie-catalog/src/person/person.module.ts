import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
	controllers: [PersonController],
	providers: [PersonService],
	imports: [DatabaseModule],
})
export class PersonModule {}
