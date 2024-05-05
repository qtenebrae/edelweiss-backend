import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RtDto } from './dto/rt.dto';
import { AtDto } from './dto/at.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body(new ValidationPipe()) SignupDto: SignupDto) {
		return this.authService.signup(SignupDto);
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async singin(@Body(new ValidationPipe()) SigninDto: SigninDto) {
		return this.authService.signin(SigninDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Body(new ValidationPipe()) rtDto: RtDto) {
		return this.authService.logout(rtDto.rt);
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(@Body(new ValidationPipe()) rtDto: RtDto) {
		return this.authService.refreshToken(rtDto.rt);
	}

	@Post('introspect')
	@HttpCode(HttpStatus.OK)
	async introspect(@Body(new ValidationPipe()) atDto: AtDto) {
		return this.authService.introspect(atDto.at);
	}
}
