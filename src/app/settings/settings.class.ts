import { DragonsSettings } from "./subSettings/dragonsSettings";
import { MainSettings } from "./subSettings/mainSettings";

export class Settings {
	main: MainSettings;
	dragons: DragonsSettings;
	constructor(){
		this.main = new MainSettings();
		this.dragons = new DragonsSettings();
	}
}