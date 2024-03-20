import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { BehaviorSubject, combineLatest, map, shareReplay, switchMap } from 'rxjs';
import { DetailedStation, Reading, Station } from '../../../../models/Station';
import { BreakPoint } from '../../../../models/breakPoint';
import { HistoryInterval, OverviewType, SwaggerService } from '../../../../services/swagger.service';
import { OmmanDate, formatDateYYMMDD, formatTime } from '../../../../unitlize/custom-date';
import { getRandomNumber } from '../summary/model';
import { LocalizationService } from './../../../../services/localization.service';

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
          boxHeight: 12,
          boxWidth: 12,
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
          this.breakPoints = breakPoints.aqi_breakpoints?.sort((a, b) => a.sequence - b.sequence);
        } else {
          this.breakPoints = breakPoints?.variables?.find(res => res.code === type)?.variable_breakpoints?.sort((a, b) => a.sequence - b.sequence)
          
        }

        return combineLatest([
          this.lang$,
          this.getHistory(interval, this.filter_type, type, this.currentStation.code, from, to),
          ...stationsToCompare.map(code => this.getHistory(interval, this.filter_type, type, code, from, to).pipe(map(res => ({ code, data: res }))))])
      }))
      .subscribe(([lang, history, ...stationsToCompare]) => {
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
          this.setDoughnutChartData(lang)
        }




        if (this.interval === 'day' ) {
          this.lineChartLabels = this.history.map(res =>  formatDateYYMMDD(OmmanDate(res.aggregated_at)) + ' ' + formatTime(OmmanDate(res.aggregated_at)))


        }

        else if (this.interval === 'month' || this.interval === 'week') {
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
            },

            // borderColor: '#000',
            // backgroundColor: '#000'
          }
        ]


        stationsToCompare.forEach((c_station_history, i) => {

          const color = colorPalette[i];
          const new_lineChartData =
          {
            data: c_station_history.data.map(res => res.value || 0),
            label: this.stations.find(res => res.code === c_station_history.code)?.name_en,

            pointBackgroundColor: color,

            segment: {
              // backgroundColor: (ctx)=> getBackground(ctx), 
              borderColor: color,
              borderWidth: 6
            },

            borderColor: color,
            backgroundColor: color
          }

          this.lineChartData.push(new_lineChartData)
        })


      })
  }

  getKeyName(key, lang) {
    if (lang === 'ar') {

      return this.summary[key].find(res => res?.status_en === key && !!res?.status_ar)?.status_ar || 'غير متاح'
    } else {
      return key
    }

  }

  setDoughnutChartData(lang) {

    const keys = Object.keys(this.summary)
    const backgroundColor = keys.map(key => this.history.find(res => res.status_en === key)?.color || 'rgb(231, 231, 231)')

    this.summaryKeys = keys.map((key, i) => ({ name: this.getKeyName(key, lang), percentage: this.summary[key].length / this.history.length * 100, color: backgroundColor[i] }));

    const data = keys.map(key => this.summary[key].length)


    this.doughnutChartData =
    {
      labels: keys.map(key => this.getKeyName(key, lang)),
      datasets: [{
        label: 'AQI',
        data,
        backgroundColor
      }]
    };

    this.doughnutChartLabels = keys.map(key => this.getKeyName(key, lang))
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
    this.activeInterval$.next(interval);
  }


  disabledDate = (current: Date): boolean => {

    const currentDate = current.getFullYear() * 10000 + (current.getMonth() + 1) * 100 + current.getDate();
    const end = new Date().getFullYear() * 10000 + (new Date().getMonth() + 1) * 100 + new Date().getDate();
    return currentDate > end;
  };

  captureDiv() {
    if (this.downloadType === 'pdf') {
      this.captureDivAsPDF()

    } else {
      this.captureDivAsImage()
    }
  }

  captureDivAsImage() {
    html2canvas(this.captureDiv1.nativeElement).then(canvas => {
      // Convert canvas to PNG image
      const imageData = canvas.toDataURL('image/png');

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      const stations = this.lineChartData.map(res => res.label).join(',')

      link.download = stations + '-report.png';

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
      // const imgHeight = canvas.height * 400 / canvas.width; // Adjusting height to maintain aspect ratio
      // console.log(imgHeight,'height')
      pdf.addImage(imgData, 'PNG', 30, 30, 400, 180);

      const stations = this.lineChartData.map(res => res.label).join(',')

      // Save the PDF
      pdf.save(stations + '-report.pdf');
    });
  }
}
