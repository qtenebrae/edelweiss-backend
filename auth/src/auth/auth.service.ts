import { HttpException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ProfileService } from 'src/profile/profile.service';

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
		private readonly configService: ConfigService,
		@Inject(ProfileService) private readonly profileService: ProfileService,
	) {}

	async signup(signupDto: SignupDto) {
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

		const user = await this.signin({ email: signupDto.email, password: signupDto.password });

		const payload = await this.introspect(user.access_token);

		const newUser = await this.profileService.saveUser({
			id: payload.sub,
			login: signupDto.login,
			email: signupDto.email,
			profile: {
				firstname: signupDto.firstName,
				lastname: signupDto.lastName,
			},
			settings: {},
		});

		return newUser;
	}

	async signin(signinDto: SigninDto) {
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
			throw new HttpException(`${error.message}`, error.response.status);
		}
	}

	async logout(rt: string) {
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
	}

	async refreshToken(rt: string) {
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
	}

	async introspect(at: string) {
		const response = await axios.post(
			`http://${this.configService.get('KEYCLOAK_HOST')}:${this.configService.get('KEYCLOAK_PORT')}
			/realms/${this.configService.get('KEYCLOAK_REALM')}/protocol/openid-connect/token/introspect`,
			{
				client_id: `${this.configService.get('CLIENT_ID')}`,
				client_secret: `${this.configService.get('CLIENT_SECRET')}`,
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
