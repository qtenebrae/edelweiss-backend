import { Module } from '@nestjs/common';
import { PersonModule } from './person/person.module';
import { ProfessionModule } from './profession/profession.module';

@Module({
	imports: [PersonModule, ProfessionModule],
})
export class AppModule {}
