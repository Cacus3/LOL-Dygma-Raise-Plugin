import { Color } from '../../services/ledService/color';

export class Timer {
	colors: Color[];
	mapName: string;
	waitBeetweenTime: number;
	time: number;
  repeat: number;

  constructor(
    colors: Color[],
    mapName: string,
    waitBeetweenTime: number,
    time: number,
    repeat: number
) {
    this.colors = colors;
    this.mapName = mapName;
    this.waitBeetweenTime = waitBeetweenTime;
    this.time = time;
    this.repeat = repeat;
  }

}
