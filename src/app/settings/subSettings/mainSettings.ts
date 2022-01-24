export class MainSettings{
	active: boolean;
	gamePort: number;
	dygmaPort: string;

	constructor() {
		this.active=true;
		this.gamePort=2999;
		this.dygmaPort = 'COM3';
	}
}
