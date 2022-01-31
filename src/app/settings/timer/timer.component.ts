import { Component, Input, OnInit } from '@angular/core';
import { Color } from '../../services/ledService/color';
import { LedControllService } from '../../services/ledService/ledControll.service';
import { LedMap } from '../../services/ledService/ledMap';

import { Timer } from '../subSettings/Timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit{
	@Input()
	timer: Timer;
	colors: string[];
	ledMaps: LedMap[];
	constructor(private ledControllService: LedControllService){}
	ngOnInit(): void {
		this.colors = this.timer.colors.map((c: Color)=>`rgb(${c.red},${c.green},${c.blue})`);
		this.ledMaps = this.ledControllService.ledMaps;
	}

	toColor(rgb,item){
		const color: Color = new Color({red:0, green:0, blue:0});
		color.fromRBG(rgb);
		this.timer.colors[item]=color;
	}

	addNewColor(){
		this.timer.colors.push(new Color({red:255, green:255, blue:255}));
	}

	removeColor(index){
		this.timer.colors.splice(index,1);
		this.colors = this.timer.colors.map((c: Color)=>`rgb(${c.red},${c.green},${c.blue})`);
	}
}
