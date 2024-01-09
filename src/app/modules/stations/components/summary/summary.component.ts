import { Component } from '@angular/core';
import { AirItem, Header, testItem } from './model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  headers = Header

  listOfData = testItem
  ;
}

