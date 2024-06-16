import {
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpException,
	HttpStatus,
	Inject,
	Post,
	Put,
	Req,
	ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RtDto } from './dto/rt.dto';
import { Request } from 'express';
import { ResetPasswordDto } from './dto/reset.dto';
import { ProfileService } from 'src/profile/profile.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		@Inject(ProfileService) private readonly profileService: ProfileService,
	) {}

	@ApiOperation({ summary: 'Регистрация нового пользователя' })
	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
		const userExists = await this.profileService.findUserByEmail(signupDto.email);
		if (userExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.authService.signup(signupDto);
	}

	@ApiOperation({ summary: 'Вход пользователя в систему' })
	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async singin(@Body(new ValidationPipe()) signinDto: SigninDto) {
		const userExists = await this.profileService.findUserByEmail(signinDto.email);
		if (!userExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return await this.authService.signin(signinDto);
	}

	@ApiOperation({ summary: 'Выход пользователя из системы' })
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Body(new ValidationPipe()) rtDto: RtDto) {
		try {
			return await this.authService.logout(rtDto.rt);
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	@ApiOperation({ summary: 'Обновление токена доступа' })
	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(@Body(new ValidationPipe()) rtDto: RtDto) {
		try {
			return await this.authService.refreshToken(rtDto.rt);
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	@ApiOperation({ summary: 'Проверка токена доступа' })
	@Post('introspect')
	@HttpCode(HttpStatus.OK)
	async introspect(@Headers('Authorization') at: string, @Req() req: Request) {
		if (at === undefined) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
		const response = await this.authService.introspect(at);
		if (response.active == false) {
			throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
		}

		return response;
	}

	@ApiOperation({ summary: 'Обновление пароля пользователя' })
	@Put('reset-password')
	@HttpCode(HttpStatus.OK)
	async resetPasswrod(@Body(new ValidationPipe()) resetDto: ResetPasswordDto) {
		return null;
	}
}
