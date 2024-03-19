import { Component, Input } from '@angular/core';
import { BreakPoint } from './../../../../models/breakPoint';
import { Lang } from '../../../../services/localization.service';


@Component({
  selector: 'app-severity-bar',
  templateUrl: './severity-bar.component.html',
  styleUrl: './severity-bar.component.scss'
})
export class SeverityBarComponent {  
  @Input() type : 'horizontal' | 'vertical' = 'horizontal' // horizontal or vertical 
  @Input() unit: string
  @Input() lang : Lang;
  
  @Input() breakPoints : BreakPoint[] = [];

  constructor(){
  }
}
