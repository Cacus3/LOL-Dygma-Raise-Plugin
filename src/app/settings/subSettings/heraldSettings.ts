import { Color } from '../../services/ledService/color';
import { Timer } from './Timer';

export class HeraldSettings{
	timers: Timer[] = [];
	active = true;

	constructor(){
		const red = new Color({red:255,green:0,blue:0});
		const green = new Color({red:0,green:250,blue:0});
		const white = new Color({red:255,green:255,blue:255});
		this.timers.push(new Timer([red, green, red],'backlight',250,1));
		this.timers.push(new Timer([green, white, green],'backlight',250,60));
		this.timers.push(new Timer([red, green, white , red],'backlight',250,30));
	}
}
