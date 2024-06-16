import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [ConfigModule, ProfileModule],
})
export class AuthModule {}
