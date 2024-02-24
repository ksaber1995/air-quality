import { Component, Input } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { BehaviorSubject, combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { DetailedStation, Reading, Station } from '../../../../models/Station';
import { BreakPoint } from '../../../../models/breakPoint';
import { HistoryInterval, OverviewType, SwaggerService } from '../../../../services/swagger.service';
import { OmmanDate, formatDateYYMMDD, formatTime, getDayName } from '../../../../unitlize/custom-date';
import { getRandomNumber } from '../summary/model';

const colorPalette = [
  '#1f77b4', // blue
  '#8c564b', // brown
  '#e377c2', // pink
  '#bcbd22', // olive
  '#17becf', // cyan
  '#ff5733', // coral
  '#ff33f2', // magenta
  '#5733ff', // indigo
];


const getBackground = (value, breakPoints: BreakPoint[]) => {
  return breakPoints?.find(res => value >= res.breakpoint_start && value <= res.breakpoint_end)?.color || '#d1d1d1'

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
  stationsToCompare$ = new BehaviorSubject<string[]>([])
  type$ = new BehaviorSubject<string>('aqi')
  type = 'aqi';

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
  public doughnutChartLabels: string[] = []

  public doughnutChartData: ChartData<'doughnut'>;

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

  getHistory(interval: HistoryInterval, type: OverviewType, variable_code: string, station_code: string) {
    return this.swagger.getStationHistory({ station_code, type, interval, variable_code })
  }

  ngOnInit(): void {
    const breakPoints$ = this.swagger.getBreakPoints().pipe(shareReplay())

    combineLatest([this.activeInterval$, this.type$, this.stationsToCompare$, breakPoints$])
      .pipe(switchMap(([interval, type, stationsToCompare, breakPoints]) => {
        this.interval = interval;
        this.filter_type = type === 'aqi' ? 'aqi' : 'variable';
        if (type === 'aqi') {
          this.breakPoints = breakPoints.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)
        } else {
          this.breakPoints = breakPoints?.variables?.find(res => res.code === type)?.variable_breakpoints?.sort((a, b) => a.sequence - b.sequence)
        }

        return combineLatest([this.getHistory(interval, this.filter_type, type, this.currentStation.code), ...stationsToCompare.map(code => this.getHistory(interval, this.filter_type, type, code).pipe(map(res => ({ code, data: res }))))])
      }))
      .subscribe(([history, ...stationsToCompare]) => {
        this.history = history;

        console.log(stationsToCompare, 'kokoko')

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
          this.setDoughnutChartData()
        }




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
              borderColor: (ctx) => getBackground(ctx.p0.parsed.y, this.breakPoints),
              borderWidth: 6
            }
          }
        ]


        stationsToCompare.forEach(c_station_history => {

          const randomIndex = getRandomNumber(8);
          const new_lineChartData =
          {
            data: c_station_history.data.map(res => res.value || 0),
            label: this.stations.find(res => res.code === c_station_history.code)?.name_en,


            pointBackgroundColor: colorPalette[randomIndex ],

            segment: {
              // backgroundColor: (ctx)=> getBackground(ctx), 
              borderColor: colorPalette[randomIndex],
              borderWidth: 6
            }
          }

          this.lineChartData.push(new_lineChartData)
        })


      })
  }
  setDoughnutChartData() {
    const keys = Object.keys(this.summary)
    const backgroundColor = keys.map(key => this.history.find(res => res.status_en === key)?.color || 'rgb(231, 231, 231)')
    this.summaryKeys = keys.map((key, i) => ({ name: key, percentage: this.summary[key].length / this.history.length * 100, color: backgroundColor[i] }));
    const data = keys.map(key => this.summary[key].length)

    this.doughnutChartData =
    {
      labels: keys,
      datasets: [{
        label: 'AQI',
        data,
        backgroundColor
      }]
    };

    this.doughnutChartLabels = keys
  }

  onDateChange() {

  }

  onVariableChange(e) {
    this.type$.next(e)
  }

  onStationChange(e) {
    this.stationsToCompare$.next(e)
  }

  onIntervalChange(interval: HistoryInterval) {
    this.activeInterval$.next(interval)
  }
}
