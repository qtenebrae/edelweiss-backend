import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ConfigModule } from '@nestjs/config';
import { ProfileModel } from './profile.model/profile.model';
import { TypegooseModule } from '@m8a/nestjs-typegoose';

@Module({
	controllers: [ProfileController],
	providers: [ProfileService],
	imports: [
		ConfigModule,
		TypegooseModule.forFeature([
			{
				typegooseClass: ProfileModel,
				schemaOptions: {
					collection: 'User',
				},
			},
		]),
	],
	exports: [ProfileService],
})
export class ProfileModule {}
