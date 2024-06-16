import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('Profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	@ApiOperation({ summary: 'Сохранение данных нового пользователя' })
	@Post('save')
	@HttpCode(HttpStatus.OK)
	async save() {}

	@ApiOperation({ summary: 'Получение данных пользователя' })
	@Post('get')
	@HttpCode(HttpStatus.OK)
	async userById(@Body() data: { id: string }) {
		return this.profileService.findUserById(data.id);
	}

	@ApiOperation({ summary: 'Обновление личных данных' })
	@Put('update-profile')
	@HttpCode(HttpStatus.OK)
	async updateProfile() {}

	@ApiOperation({ summary: 'Обновление настроек профиля' })
	@Put('update-settings')
	@HttpCode(HttpStatus.OK)
	async updateSettings() {}
}
