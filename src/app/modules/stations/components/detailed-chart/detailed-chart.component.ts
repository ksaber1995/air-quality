import { Component, Input } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { BehaviorSubject, combineLatest, filter, map, shareReplay, switchMap } from 'rxjs';
import { DetailedStation, Reading, Station } from '../../../../models/Station';
import { BreakPoint } from '../../../../models/breakPoint';
import { HistoryInterval, OverviewType, SwaggerService } from '../../../../services/swagger.service';
import { OmmanDate, formatDateYYMMDD, formatTime, getDayName } from '../../../../unitlize/custom-date';
import { Levels } from '../../../shared/model/severity';
import { getRandomNumber } from '../summary/model';



const getBackground = (value, breakPoints: BreakPoint[]) => {
  return breakPoints.find(res => value >= res.breakpoint_start && value <= res.breakpoint_end)?.color

}

@Component({
  selector: 'app-detailed-chart',
  templateUrl: './detailed-chart.component.html',
  styleUrl: './detailed-chart.component.scss'
})
export class DetailedChartComponent {
  @Input() stations: Partial<Station>[];
  @Input() variables: { abbreviation_en: any; code: string; }[];
  @Input() details: DetailedStation;
  @Input() currentStation: Station


  activeInterval$ = new BehaviorSubject<HistoryInterval>('day')
  type$ = new BehaviorSubject<string>('aqi')

  interval: HistoryInterval = 'day';

  filter_type;
  date: Date;
  getRandomNumber = getRandomNumber
  downloadType = 'pdf'

  breakPoints: BreakPoint[] = [];




  public lineChartData: ChartDataset[];

  public doughnutChartOptions = {
    responsive: true,
    // cutout: 50,  
    cutout: '75%',

    elements: {
      arc: {
        borderWidth: 1

      },

      bar: {
        borderWidth: 10
      },
      line: {
        borderWidth: 10
      },
      point: {
        borderWidth: 10
      }
    },



  };


  public lineChartLabels: string[];
  public doughnutChartLabels: string[] = Levels.map(res => res.name);

  public doughnutChartData: ChartData<'doughnut'> ;

  public lineChartOptions: ChartOptions = {
    responsive: true,

    scales: {

      y: {
        // backgroundColor: 'blue',
        grid: {
          drawOnChartArea: false,
          offset: false,
          circular: true,
        },

        angleLines: {
          display: true
        },




      },

      x: {
        ticks: {
          // stepSize: 3,
          // maxTicksLimit: 28


        }



      }


    },
  };
  history: Reading[];

  summary: { [key: string]: Reading[] } = {}
  summaryKeys: { name: string; percentage: number; color: string; }[] = [];


  constructor(private swagger: SwaggerService) {

  }

  getHistory(interval: HistoryInterval, type: OverviewType) {
    return this.swagger.getStationHistory({ station_code: this.currentStation.code, type, interval })
  }

  ngOnInit(): void {
    const breakPoints$ = this.swagger.getBreakPoints().pipe(map(res => res.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence))).pipe(shareReplay())

    combineLatest([this.activeInterval$, this.type$])
      .pipe(switchMap(([interval, type]) => {
        this.interval = interval;
         this.filter_type = type === 'aqi' ? 'aqi' : 'variable';

        return combineLatest([this.getHistory(interval, this.filter_type), breakPoints$])
      }))
      .subscribe(([history, breakPoints]) => {
        this.history = history;
        console.log(history, 'koko')
        this.breakPoints = breakPoints
        
        this.summary = {}
        if (this.filter_type === 'aqi') {

          this.history.forEach(item => {
            const status = item.status_en || 'na'

            if (this.summary[status]) {
              this.summary[status].push(item)
            }
            else {
              this.summary[status] = [item]
            }
          })
        }

        console.log(this.summary, 'summary')


        this.setDoughnutChartData()


        if (this.interval === 'day' || this.interval === 'week') {
          this.lineChartLabels = this.history.map(res => getDayName(OmmanDate(res.aggregated_at).getDay()) + formatTime(OmmanDate(res.aggregated_at)))
        }

        else if (this.interval === 'month') {
          this.lineChartLabels = this.history.map(res => formatDateYYMMDD(OmmanDate(res.aggregated_at)))
        }


        this.lineChartData = [
          {
            data: this.history.map(res => res.value || 0),

            label: this.currentStation.name_en,


            pointBackgroundColor: this.history.map(res => res.color),

            segment: {
              // backgroundColor: (ctx)=> getBackground(ctx), 
              borderColor: (ctx) => getBackground(ctx.p0.parsed.y, breakPoints),
              borderWidth: 6
            }
          },
        ]


      })
  }
  setDoughnutChartData() {
    const keys = Object.keys(this.summary) 
    const backgroundColor = keys.map(key => this.history.find(res=> res.status_en === key)?.color || 'rgb(231, 231, 231)' )
    this.summaryKeys = keys.map((key,i)=>({name: key, percentage: this.summary[key].length  / this.history.length * 100, color: backgroundColor[i] } ));
    const data = keys.map(key=> this.summary[key].length)

    this.doughnutChartData =
    {
      labels: keys,
      datasets: [{
  
        label: 'AQI',
        data,
        
        backgroundColor,
      }]
    };
  }

  onDateChange() {

  }

  onIntervalChange(interval: HistoryInterval) {
    this.activeInterval$.next(interval)

  }
}
