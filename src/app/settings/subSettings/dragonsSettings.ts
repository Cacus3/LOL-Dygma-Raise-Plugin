import { Timer } from "./timer";

export class DragonsSettings{
	active:boolean;
	timers:Timer[];

	constructor() {
		this.active=true;
		this.timers = [new Timer(),new Timer()];
	}
}