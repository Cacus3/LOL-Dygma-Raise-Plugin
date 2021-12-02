import { Color } from '../../services/ledService/color';
import { Timer } from './Timer';

export class DragonsSettings{
	timers: Timer[] = [];
	active = true;

	constructor(){
		this.timers.push(new Timer([new Color({red:255,green:0,blue:0})],'backlight',250,1,3));
		this.timers.push(new Timer([new Color({red:0,green:250,blue:0})],'backlight',250,60,3));
		this.timers.push(new Timer([new Color({red:255,green:255,blue:255})],'backlight',250,30,3));
	}
}
