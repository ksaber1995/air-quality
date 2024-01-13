import { Component } from '@angular/core';
import { AirItem, Header, testItem } from './model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  time = (new Date()).toLocaleString();
  station: any = "Nizwa"
  percent: any = 'moderate'

  headers = Header

  listOfData = testItem
  ;
}

