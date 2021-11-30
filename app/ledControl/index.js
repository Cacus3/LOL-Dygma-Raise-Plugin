const Color = require('./color')
class LedControllService {
	LedMaps= [];
	serialService;
	constructor(serialService) {
		this.serialService = serialService;
		const backlight = [];
		for (let i = 69; i <= 130; i++) {
			backlight.push(i);
		}
		this.LedMaps.push({name:'backlight',ledIds: backlight});
		this.LedMaps.push({name:'neuron',ledIds: [131]});
		const all = [];
		for (let i = 0; i <= 131; i++) {
			all.push(i);
		}
		this.LedMaps.push({name:'all', ledIds:all});
	}

	setLeds(color, ledIDs) {
		const command = `led.setMultiple ${color.red} ${color.green} ${color.blue} ${ledIDs.join(' ')}\n`;
		this.serialService.write(command);
	}

	setLed(color, ledID) {
		const command = `led.at ${ledID} ${color.red} ${color.green} ${color.blue}\n`;
		this.serialService.write(command);
	}

	async getLeds(ledIDs) {
		const rtn = [];
		const lastResult = this.serialService.lastResult;
		const command = `led.getMultiple ${ledIDs.join(' ')}\n`;
		await this.serialService.write(command);
		const r = await this.serialService.getLastResult(lastResult);
		for (const led of r.data) {
			if (led.includes('#')) {
				const split = led.split(' # ');
				const c = split[1].split(' ');
				rtn.push({id: +split[0], color:new Color({ red: +c[0], green: +c[1], blue: +c[2] })});
			}
		}
		return rtn;
	}

	async getLedsGroupedByColor(ledIDs) {
		const allleds = await this.getLeds(ledIDs);
		let map = {};
		for(let led of allleds){
			if(map[led.color.toRGB('.')]){
				map[led.color.toRGB('.')].push(led.id)
			} else {
				map[led.color.toRGB('.')] = [led.id]
			}
		}
		return map;
	}

	getLedMap(name) {
		return this.LedMaps.filter(
			(ledMap) => ledMap.name === name.toLocaleLowerCase(),
		)[0];
	}
}

module.exports = LedControllService