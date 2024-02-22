import { Colors } from '../../../shared/model/colors';
import { BreakPoint } from './../../../../models/breakPoint';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-severity-bar',
  templateUrl: './severity-bar.component.html',
  styleUrl: './severity-bar.component.scss'
})
export class SeverityBarComponent {
  gray = Colors.LightGray;

  @Input() type : 'horizontal' | 'vertical' = 'horizontal' // horizontal or vertical 

  constructor(){

  }

  @Input() breakPoints : BreakPoint[] = [];

}
