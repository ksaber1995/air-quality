import { LocalizationService } from './../../../../services/localization.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, LegendOptions } from 'chart.js';
import { BehaviorSubject, combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { DetailedStation, Reading, Station } from '../../../../models/Station';
import { BreakPoint } from '../../../../models/breakPoint';
import { HistoryInterval, OverviewType, SwaggerService } from '../../../../services/swagger.service';
import { OmmanDate, formatDateYYMMDD, formatTime, getDateNsDaysAgo, getDayName } from '../../../../unitlize/custom-date';
import { getRandomNumber } from '../summary/model';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
  @ViewChild('captureDiv1') captureDiv1: ElementRef;
  @ViewChild('captureDiv2') captureDiv2: ElementRef;

  @Input() stations: Partial<Station>[];
  @Input() variables: { abbreviation_en: any; code: string; }[];
  @Input() details: DetailedStation;
  @Input() currentStation: Station

  startDate: Date;
  endDate: Date;

  from$ = new BehaviorSubject<string>(null)
  to$ = new BehaviorSubject<string>(null)
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




  public lineChartData: ChartDataset<'line'>[];

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


  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,

    scales: {

      y: {
        // backgroundColor: 'blue',
        grid: {
          drawOnChartArea: false,
          offset: false,
          circular: true,
        }
      },

      x: {
        ticks: {
          // stepSize: 3,
          // maxTicksLimit: 28

        }
      }
    },

    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        display: true,
        labels: {
          // color:
        }
      }
    }
  };
  history: Reading[];

  summary: { [key: string]: Reading[] } = {}
  summaryKeys: { name: string; percentage: number; color: string; }[] = [];

  lang$ = this.localization.getCurrentLanguage();
  constructor(private swagger: SwaggerService, private localization: LocalizationService) {

  }

  getHistory(interval: HistoryInterval, type: OverviewType, variable_code: string, station_code: string, from: string, to: string) {
    return this.swagger.getStationHistory({ station_code, type, interval, variable_code, from, to })
  }

  ngOnInit(): void {
    const breakPoints$ = this.swagger.getBreakPoints().pipe(shareReplay())

    combineLatest(
      [
        this.activeInterval$,
        this.type$,
        this.stationsToCompare$,
        breakPoints$,
        this.from$,
        this.to$

      ])
      .pipe(switchMap(([interval, type, stationsToCompare, breakPoints, from, to]) => {
        this.interval = interval;
        this.filter_type = type === 'aqi' ? 'aqi' : 'variable';
        if (type === 'aqi') {
          this.breakPoints = breakPoints.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence)
        } else {
          this.breakPoints = breakPoints?.variables?.find(res => res.code === type)?.variable_breakpoints?.sort((a, b) => a.sequence - b.sequence)
        }

        return combineLatest([this.getHistory(interval, this.filter_type, type, this.currentStation.code, from, to), ...stationsToCompare.map(code => this.getHistory(interval, this.filter_type, type, code, from, to).pipe(map(res => ({ code, data: res }))))])
      }))
      .subscribe(([history, ...stationsToCompare]) => {
        this.history = history;


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

          if (this.interval === 'day') {
            this.startDate = getDateNsDaysAgo(1)
            this.endDate = OmmanDate()
          } else {
            this.startDate = getDateNsDaysAgo(8)
            this.endDate = OmmanDate()
          }
        }

        else if (this.interval === 'month') {
          this.lineChartLabels = this.history.map(res => formatDateYYMMDD(OmmanDate(res.aggregated_at)))
          this.startDate = getDateNsDaysAgo(32)
          this.endDate = OmmanDate()
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
            },

            borderColor: '#000',
            backgroundColor: '#000'
          }
        ]


        stationsToCompare.forEach(c_station_history => {

          const randomIndex = getRandomNumber(6);
          const new_lineChartData =
          {
            data: c_station_history.data.map(res => res.value || 0),
            label: this.stations.find(res => res.code === c_station_history.code)?.name_en,

            pointBackgroundColor: colorPalette[randomIndex],

            segment: {
              // backgroundColor: (ctx)=> getBackground(ctx), 
              borderColor: colorPalette[randomIndex],
              borderWidth: 6
            },

            borderColor: colorPalette[randomIndex],
            backgroundColor: colorPalette[randomIndex]
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

  onDateChange(e) {
    this.from$.next(e[0])
    this.to$.next(e[1])
  }

  onVariableChange(e) {
    this.type$.next(e)
  }

  onStationChange(e) {
    this.stationsToCompare$.next(e)
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

  captureDivAsImage() {
    html2canvas(this.captureDiv1.nativeElement).then(canvas => {
      // Convert canvas to PNG image
      const imageData = canvas.toDataURL('image/png');

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.download = 'report.png';
      link.href = imageData;
      link.click();
    });
  }

  captureDivAsPDF() {
    // Get a reference to the div element
    const div = this.captureDiv1.nativeElement;

    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'px', 'a4');

    // Options to set for html2canvas
    const options = {
      scale: 2 // Increase scale to improve resolution (optional)
    };

    // Capture the div content as an image
    html2canvas(div, options).then((canvas) => {
      // Convert canvas to an image data URL
      const imgData = canvas.toDataURL('image/png');

      // Add the image to the PDF document
      const imgHeight = canvas.height * 208 / canvas.width; // Adjusting height to maintain aspect ratio
      pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);

      // Save the PDF
      pdf.save('div_content.pdf');
    });
  }
}
