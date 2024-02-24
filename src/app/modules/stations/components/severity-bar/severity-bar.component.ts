import { Component, Input } from '@angular/core';
import { BreakPoint } from './../../../../models/breakPoint';

@Component({
  selector: 'app-severity-bar',
  templateUrl: './severity-bar.component.html',
  styleUrl: './severity-bar.component.scss'
})
export class SeverityBarComponent {
  gray = '#D1D1D1';

  @Input() type : 'horizontal' | 'vertical' = 'horizontal' // horizontal or vertical 

  constructor(){

  }

  @Input() breakPoints : BreakPoint[] = [];

}
