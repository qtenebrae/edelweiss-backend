import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

class Profile {
	@prop()
	firstname: string;

	@prop()
	lastname: string;

	@prop()
	middlename?: string;

	@prop()
	sex?: string;

	@prop()
	birthday?: Date;
}

class Settings {
	language?: string;
	notifications?: boolean;
}

export interface ProfileModel extends Base {}
export class ProfileModel extends TimeStamps {
	@prop({ unique: true })
	id: string;

	@prop({ unique: true })
	email: string;

	@prop()
	login: string;

	@prop()
	profile: Profile;

	@prop()
	settings: Settings;
}
