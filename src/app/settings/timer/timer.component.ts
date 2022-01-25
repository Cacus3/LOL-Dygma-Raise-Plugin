import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { Color } from '../../services/ledService/color';

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

	ngOnInit(): void {
		this.colors = this.timer.colors.map((c: Color)=>`rgb(${c.red},${c.green},${c.blue})`);
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
