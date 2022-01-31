import { BaronSettings } from './subSettings/baronSettings';
import { DragonsSettings } from './subSettings/dragonsSettings';
import { HeraldSettings } from './subSettings/heraldSettings';
import { MainSettings } from './subSettings/mainSettings';

export class Settings {
	main: MainSettings;
	dragons: DragonsSettings;
	baron: BaronSettings;
	herald: HeraldSettings;

	constructor(){
		this.main = new MainSettings();
		this.dragons = new DragonsSettings();
		this.baron = new BaronSettings();
		this.herald = new HeraldSettings();
	}
}
