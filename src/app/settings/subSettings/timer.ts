import { Color } from '../../services/ledService/color';

export class Timer {
	colors: Color[];
	mapName: string;
	waitBeetweenTime: number;
	time: number;

  constructor(
    colors: Color[],
    mapName: string,
    waitBeetweenTime: number,
    time: number,
) {
    this.colors = colors;
    this.mapName = mapName;
    this.waitBeetweenTime = waitBeetweenTime;
    this.time = time;
  }

}
