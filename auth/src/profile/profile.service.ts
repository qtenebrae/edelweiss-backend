import { InjectModel } from '@m8a/nestjs-typegoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ProfileModel } from './profile.model/profile.model';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class ProfileService {
	constructor(
		private readonly configService: ConfigService,
		@InjectModel(ProfileModel) private readonly userModel: ModelType<ProfileModel>,
	) {}

	async saveUser(user: IUser) {
		new this.userModel(user).save();
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({ email }).exec();
	}

	async findUserById(id: string) {
		return this.userModel.findOne({ id }).exec();
	}
}
