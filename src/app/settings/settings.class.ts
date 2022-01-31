import { BaronSettings } from './subSettings/baronSettings';
import { DragonsSettings } from './subSettings/dragonsSettings';
import { HeraldSettings } from './subSettings/heraldSettings';
import { MainSettings } from './subSettings/mainSettings';

export class Settings {
	lang: string;
	main: MainSettings;
	dragons: DragonsSettings;
	baron: BaronSettings;
	herald: HeraldSettings;

	constructor(){
		this.lang = 'gb';
		this.main = new MainSettings();
		this.dragons = new DragonsSettings();
		this.baron = new BaronSettings();
		this.herald = new HeraldSettings();
	}
}
