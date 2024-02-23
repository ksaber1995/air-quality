import { BreakPoint } from './../../../../models/breakPoint';
import { HistoryInterval, OverviewType, SwaggerService } from './../../../../services/swagger.service';
import { Component, OnInit } from '@angular/core';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';
import { airQualityItems } from '../../../shared/model/air-quality';
import { BehaviorSubject, combineLatest, from, interval, map, switchMap } from 'rxjs';
import { OmmanDate, daysSincePastDate, formatTime, getDateOnNumber, getTimeOnNumber, weeksEndsToday } from '../../../../unitlize/custom-date';
const Radius = 12;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  date: Date;

  airQualityItems = airQualityItems;
  type = 'all'
  routes: IBreadCrumb[] = [
    {
      title: 'Home',
      link: '/'
    }
  ];

  activeInterval$ = new BehaviorSubject<HistoryInterval>('day')
  type$ = new BehaviorSubject<OverviewType>('aqi')
  from$ = new BehaviorSubject<string>(null)
  to$ = new BehaviorSubject<string>(null)
  overview$ = this.swagger.getStationsOverview({ type: 'aqi', interval: 'month' });
  sub;

  breakPoints$ = this.swagger.getBreakPoints().pipe(map(res => res.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)))

  breakPoints: BreakPoint[] = []

  data = []
  isLoaded = false;
  breakPointLoaded = false;
  constructor(private swagger: SwaggerService) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    console.log(weeksEndsToday())
    this.breakPoints$.subscribe(res => {
      this.breakPoints = res;
      this.breakPointLoaded = true;
    })

    this.sub = combineLatest([
      this.activeInterval$,
      this.type$,
      this.from$,
      this.to$
    ])

      .pipe(switchMap(([interval, type, from, to]) => {
        this.isLoaded = false;

        return this.swagger.getStationsOverview({ type, interval, from, to })
      }))
      .subscribe(items => {
        const interval = this.activeInterval$.getValue();

        const stations = Object.keys(items)
        const chartData = []

        if (interval === 'day') {
          stations.forEach(station => {
            const station_items = items[station]

            const stationData = station_items.map(item => {
              return { x: getTimeOnNumber(OmmanDate(item.aggregated_at)), y: item.value || 0, r: Radius }
            })



            chartData.push({
              data: stationData,
              label: station
            })
          })



        } else if (interval === 'week') {
          stations.forEach(station => {
            const station_items = items[station]

            const stationData = station_items.map(item => {
              return { x: getDateOnNumber(OmmanDate(item.aggregated_at)), y: item.value || 0, r: Radius }
            })



            chartData.push({
              data: stationData,
              label: station
            })
          })

        } else if (interval === 'month') {
          stations.forEach(station => {
            const station_items = items[station]


            const stationData = station_items.map(item => {
              const x =  daysSincePastDate(OmmanDate(item.aggregated_at));
              return { x , y: item.value || 0, r: Radius }
            })



            chartData.push({
              data: stationData,
              label: station
            })
          })
        }

        this.data = chartData;

        this.isLoaded = true;

      })
  }

  onDateChange() {

  }

  onIntervalChange(interval: HistoryInterval) {
    this.activeInterval$.next(interval)

  }
}
