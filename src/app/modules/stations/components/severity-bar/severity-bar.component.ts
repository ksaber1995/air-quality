import { Component } from '@angular/core';
import { Levels } from '../../../shared/model/severity';

@Component({
  selector: 'app-severity-bar',
  templateUrl: './severity-bar.component.html',
  styleUrl: './severity-bar.component.scss'
})
export class SeverityBarComponent {
  levels = Levels;
  
}