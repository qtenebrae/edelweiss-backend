import {
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpException,
	HttpStatus,
	Post,
	ValidationPipe,
	UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { RtDto } from './dto/rt.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body(new ValidationPipe()) signupDto: SignupDto) {
		const userExists = await this.authService.findUser(signupDto.email);
		console.log(userExists);
		if (userExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return this.authService.signup(signupDto);
	}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async singin(@Body(new ValidationPipe()) signinDto: SigninDto) {
		const userExists = await this.authService.findUser(signinDto.email);
		if (!userExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		return await this.authService.signin(signinDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Body(new ValidationPipe()) rtDto: RtDto) {
		try {
			return await this.authService.logout(rtDto.rt);
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	@Post('refresh')
	@HttpCode(HttpStatus.OK)
	async refresh(@Body(new ValidationPipe()) rtDto: RtDto) {
		try {
			return await this.authService.refreshToken(rtDto.rt);
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	// @Post('introspect')
	// @HttpCode(HttpStatus.OK)
	// async introspect(@Body(new ValidationPipe()) atDto: AtDto) {
	// 	return this.authService.introspect(atDto.at);
	// }

	@Post('introspect')
	@HttpCode(HttpStatus.OK)
	async introspect(@Headers('Authorization') at: string) {
		return this.authService.introspect(at);
	}
}
