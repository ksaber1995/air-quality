import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, debounce, debounceTime, map, shareReplay, switchMap } from 'rxjs';
import { OmmanDate, getDateNsDaysAgo } from '../../../../unitlize/custom-date';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';
import { BreakPoint } from './../../../../models/breakPoint';
import { HistoryInterval, SwaggerService } from './../../../../services/swagger.service';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
const Radius = 12;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {
  date: Date;

  type = 'aqi'
  routes: IBreadCrumb[] = [
    {
      title: 'Home',
      link: '/'
    }
  ];

  activeInterval$ = new BehaviorSubject<HistoryInterval>('day')
  type$ = new BehaviorSubject<string>('aqi')
  from$ = new BehaviorSubject<string>(null)
  to$ = new BehaviorSubject<string>(null)
  overview$ = this.swagger.getStationsOverview({ type: 'aqi', interval: 'month' });
  sub;

  startDate: Date;
  endDate: Date;

  breakPoints$ = this.swagger.getBreakPoints()
  variables$ = this.swagger.getStationsCode().pipe(map(res => res.variables))
  breakPoints: BreakPoint[] = []

  data = []
  isLoaded = false;

  constructor(private swagger: SwaggerService) { }
  ngOnInit(): void {
    this.getData();

    this.variables$.subscribe(re => {

    })
  }

  getData() {
    this.breakPoints$.pipe(shareReplay())



    this.sub = combineLatest([
      this.activeInterval$,
      this.type$,
      this.from$,
      this.to$,
      this.breakPoints$
    ])

      .pipe(
        debounceTime(400),
        switchMap(([interval, type, from, to, breakPoints]
        ) => {
          this.isLoaded = false;
          const filter_type = type === 'aqi' ? 'aqi' : 'variable';
          const variable_code = type !== 'aqi' ? type : undefined;

          if (type === 'aqi') {
            this.breakPoints = breakPoints.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)
          } else {
            this.breakPoints = breakPoints?.variables?.find(res => res.code === type)?.variable_breakpoints?.sort((a, b) => a.sequence - b.sequence)
          }

          return this.swagger.getStationsOverview({ type: filter_type, interval, from, to, variable_code })
        }))
      .subscribe(items => {
        const interval = this.activeInterval$.getValue();

        const stations = Object.keys(items)
        const chartData = []



        if (interval === 'day') {
          this.startDate = getDateNsDaysAgo(1)
          this.endDate = OmmanDate()

          stations.forEach(station => {
            const station_items = items[station]

            const stationData = station_items.map(item => {
              return { name: item.aggregated_at, x: OmmanDate(item.aggregated_at).getTime(), y: item.value || 0, r: Radius }
            })



            chartData.push({
              data: stationData,
              label: station
            })
          })



        } else if (interval === 'week') {
          this.startDate = getDateNsDaysAgo(8)

          this.endDate = OmmanDate()

          stations.forEach(station => {
            const station_items = items[station]

            const stationData = station_items.map(item => {
              return { x: OmmanDate(item.aggregated_at).getTime(), y: item.value || 0, r: Radius }
            })



            chartData.push({
              data: stationData,
              label: station
            })
          })

        } else if (interval === 'month') {
          this.startDate = getDateNsDaysAgo(32)
          this.endDate = OmmanDate()

          stations.forEach(station => {
            const station_items = items[station]


            const stationData = station_items.map(item => {
              const x = OmmanDate(item.aggregated_at).getTime();
              return { x, y: item.value || 0, r: Radius }
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

  onDateChange(e) {
    this.from$.next(e[0])
    this.to$.next(e[1])
  }

  onTypeChange(e: string) {

    if (e === 'aqi') {
      this.type$.next('aqi')
    } else {
      this.type$.next(e)
    }
  }

  onIntervalChange(interval: HistoryInterval, picker: NzDatePickerComponent) {
    picker.close()
    this.date = undefined
    this.activeInterval$.next(interval);
    this.from$.next(null)
    this.to$.next(null)
    // console.log()
  }


  disabledDate = (current: Date): boolean => {

    const currentDate = current.getFullYear() * 10000 + (current.getMonth() + 1) * 100 + current.getDate();
    const start = this.startDate.getFullYear() * 10000 + (this.startDate.getMonth() + 1) * 100 + this.startDate.getDate();
    const end = this.endDate.getFullYear() * 10000 + (this.endDate.getMonth() + 1) * 100 + this.endDate.getDate();
    return currentDate < start || currentDate > end;
  };
}
