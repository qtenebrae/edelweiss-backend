import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserModel } from './auth.model/auth.model';

const adminAt = async () => {
	const configService = new ConfigService();
	const response = await axios.post(
		`http://${configService.get('KEYCLOAK_HOST')}:${configService.get('KEYCLOAK_PORT')}
		/realms/${configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token`,
		{
			client_id: `${configService.get('ADMIN_CLIENT_ID')}`,
			client_secret: `${configService.get('ADMIN_CLIENT_SECRET')}`,
			grant_type: 'client_credentials',
		},
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	);

	return response.data.access_token;
};

@Injectable()
export class AuthService {
	constructor(
		private configService: ConfigService,
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
	) {}

	async signup(signupDto: SignupDto) {
		const userExists = await this.userModel.findOne({ email: signupDto.email }).exec();
		if (userExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		await axios.post(
			`http://${this.configService.get('KEYCLOAK_HOST')}:${this.configService.get('KEYCLOAK_PORT')}
		/admin/realms/${this.configService.get('KEYCLOAK_REALM')}/users`,
			{
				enabled: true,
				email: signupDto.email,
				firstName: signupDto.firstName,
				lastName: signupDto.lastName,
				credentials: [
					{
						type: 'password',
						value: signupDto.password,
						temporary: false,
					},
				],
				attributes: {
					system_roles: 'user',
				},
			},
			{
				headers: {
					Authorization: `Bearer ${await adminAt()}`,
				},
			},
		);

		const newUser = new this.userModel({
			login: signupDto.login,
			email: signupDto.email,
			profile: {
				firstname: signupDto.firstName,
				lastname: signupDto.lastName,
			},
			settings: {},
		});

		return newUser.save();
	}

	async signin(signinDto: SigninDto) {
		const userExists = await this.userModel.findOne({ email: signinDto.email }).exec();
		if (!userExists) {
			throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
		}

		try {
			const response = await axios.post(
				`http://${this.configService.get('KEYCLOAK_HOST')}:${this.configService.get('KEYCLOAK_PORT')}
			/realms/${this.configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token`,
				{
					client_id: `${this.configService.get('CLIENT_ID')}`,
					client_secret: `${this.configService.get('CLIENT_SECRET')}`,
					grant_type: 'password',
					username: signinDto.email,
					password: signinDto.password,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			return response.data;
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	async logout(rt: string) {
		try {
			const response = await axios.post(
				`http://${this.configService.get('KEYCLOAK_HOST')}:${this.configService.get('KEYCLOAK_PORT')}
			/realms/${this.configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/logout`,
				{
					client_id: `${this.configService.get('CLIENT_ID')}`,
					client_secret: `${this.configService.get('CLIENT_SECRET')}`,
					refresh_token: rt,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			return response.data;
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	async refreshToken(rt: string) {
		try {
			const response = await axios.post(
				`http://${this.configService.get('KEYCLOAK_HOST')}:${this.configService.get('KEYCLOAK_PORT')}
			/realms/${this.configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token`,
				{
					client_id: `${this.configService.get('CLIENT_ID')}`,
					client_secret: `${this.configService.get('CLIENT_SECRET')}`,
					grant_type: 'refresh_token',
					refresh_token: rt,
				},
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			return response.data;
		} catch (error) {
			throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
		}
	}

	async introspect(at: string) {
		const response = await axios.post(
			`http://${this.configService.get('KEYCLOAK_HOST')}:${this.configService.get('KEYCLOAK_PORT')}
			/realms/${this.configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token/introspect`,
			{
				client_id: `${this.configService.get('ADMIN_CLIENT_ID')}`,
				client_secret: `${this.configService.get('ADMIN_CLIENT_SECRET')}`,
				token: at,
			},
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			},
		);

		return response.data;
	}
}
