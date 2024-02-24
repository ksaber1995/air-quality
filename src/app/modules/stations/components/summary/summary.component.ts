import { Component, Input, OnInit } from '@angular/core';
import { Station } from '../../../../models/Station';
import { OmmanDate, formatTime } from '../../../../unitlize/custom-date';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  @Input() station: Station;

  lastUpdate: Date;
  headers
  listOfData
  // = testItem.map(res => ({ ...res, values: res.values.map(res => ({ ...res, color: getColorMapping(res.value) })) }))

  ngOnInit(): void {
    const lastUpdateStation = this.station.aqi[0].aggregated_at
     this.lastUpdate = OmmanDate(lastUpdateStation)

    this.headers = this.station.variables[0].readings.map(res => formatTime(OmmanDate(res.aggregated_at)) ); // get the date of the first reading
    this.listOfData = [...this.station.variables, ...this.station.weather];
  }


}
