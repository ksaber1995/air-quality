import { Component, Input } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { Levels } from '../../../shared/model/severity';
import { getRandomNumber } from '../summary/model';
import { DetailedStation, Station } from '../../../../models/Station';
import { HistoryInterval, OverviewType, SwaggerService } from '../../../../services/swagger.service';
import { combineLatest, map, shareReplay, interval, BehaviorSubject, switchMap } from 'rxjs';
import { OmmanDate, formatDateYYMMDD, formatTime, getDayName } from '../../../../unitlize/custom-date';
import { BreakPoint } from '../../../../models/breakPoint';



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

  interval: HistoryInterval = 'day';

  type;
  date: Date;
  getRandomNumber = getRandomNumber
  data = Levels;
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

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{

      // label: 'AQI',
      data: Levels.map(res => getRandomNumber(500)),
      backgroundColor: Levels.map(res => res.color),
    }]
  };

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
  history: any[];




  constructor(private swagger: SwaggerService) {

  }

  getHistory(interval: HistoryInterval, type: OverviewType) {
    return this.swagger.getStationHistory({ station_code: this.currentStation.code, type, interval })
  }

  ngOnInit(): void {
    const breakPoints$ = this.swagger.getBreakPoints().pipe(map(res => res.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence))).pipe(shareReplay())

    combineLatest([this.activeInterval$])
      .pipe(switchMap(([interval]) => {
        this.interval = interval;

        return combineLatest([this.getHistory(interval, 'aqi'), breakPoints$])
      }))
      .subscribe(([history, breakPoints]) => {
        this.history = history;
        this.breakPoints = breakPoints

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

  onDateChange() {

  }

  onIntervalChange(interval: HistoryInterval) {
    this.activeInterval$.next(interval)

  }

}
