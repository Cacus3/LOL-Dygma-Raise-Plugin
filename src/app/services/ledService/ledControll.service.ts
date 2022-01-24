import { Injectable } from '@angular/core';
import { ElectronService } from '../../core/services';
import { Color } from './color';
import { Led } from './led';
import { LedMap } from './ledMap';

@Injectable()
export class LedControllService {
	ledMaps: LedMap[] = [];
	constructor(private readonly electronService: ElectronService) {
		const backlight = [];
		for (let i = 69; i <= 130; i++) {
			backlight.push(i);
		}
		this.ledMaps.push(new LedMap('backlight', backlight));
		this.ledMaps.push(new LedMap('neuron', [131]));
		const all = [];
		for (let i = 0; i <= 131; i++) {
			all.push(i);
		}
		this.ledMaps.push(new LedMap('all', all));
	}

	setLeds(color: Color, ledIDs: number[]) {
		this.electronService.ipcRenderer.invoke('setLeds', color, ledIDs);
	}

	setLed(color: Color, ledID: number) {
		this.electronService.ipcRenderer.invoke('setLed', color, ledID);
	}

	async getLeds(ledIDs: number[]): Promise<Led[]> {
		return this.electronService.ipcRenderer.invoke('getLeds', ledIDs);
	}

	async getLedsGroupedByColor(ledIDs: number[]) {
		return this.electronService.ipcRenderer.invoke('getLedsGroupedByColor', ledIDs);
	}

	getLedMap(name: string): LedMap {
		return this.ledMaps.filter(
			(ledMap) => ledMap.name === name.toLocaleLowerCase(),
		)[0];
	}

	async blink({ mapName, colors, waitBeetweenTime = 250 }: { mapName: string; colors: Color[]; waitBeetweenTime?: number}) {
		const ids = this.getLedMap(mapName).ledIds;
		const groupColor = await this.getLedsGroupedByColor(ids);
		this.blinkLeds(groupColor, ids, colors, waitBeetweenTime);
	  }

	async waitFor(delay) {
		return new Promise((resolve) => setTimeout(resolve, delay));
	}

	async blinkLeds(oldLeds: [], ledIds: number[], colors: Color[], time: number) {
		for(const color of colors){
			this.setLeds(
			color,
			ledIds
			);
			await this.waitFor(time);
		}
		for (const key in oldLeds) {
			if (Object.prototype.hasOwnProperty.call(oldLeds, key)) {
			const rgb = key.split('.');
			const color = new Color({
				red: +rgb[0],
				green: +rgb[1],
				blue: +rgb[2],
			});
			this.setLeds(color, oldLeds[key]);
			}
		}
		await this.waitFor(time);
	}
}
