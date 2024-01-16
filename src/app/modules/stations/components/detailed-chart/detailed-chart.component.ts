import { Component } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, ChartTypeRegistry, Color } from 'chart.js';
import { getRandomNumber } from '../summary/model';

const getBackground = (value) => {

  // Set different colors based on your conditions
  // debugger
  if (value > 0 && value <= 50) {
    return '#00C800';
  } else if (value > 50 && value <= 100) {
    return '#FFE12D';
  }
  else if (value > 100 && value <= 150) {
    return '#FF7E00';
  }
  else if (value > 150 && value <= 200) {
    return '#FA0A00';
  }
  else if (value > 200 && value <= 300) {
    return '#8F3F97';
  }
  else if (value > 300) {
    return '#7E0023';
  }

  return 'rgb(231,231,231)' // not applicable

}



const data = [getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450), getRandomNumber(450)];

@Component({
  selector: 'app-detailed-chart',
  templateUrl: './detailed-chart.component.html',
  styleUrl: './detailed-chart.component.scss'
})
export class DetailedChartComponent {
  public lineChartType: keyof ChartTypeRegistry = 'line';

  public lineChartData: ChartDataset[] = [
    { 
      data: data, 

      label: 'Nizwa',

      pointBackgroundColor: data.map(res=> getBackground(res)) , 
      
      segment: {
          // backgroundColor: (ctx)=> getBackground(ctx), 
          borderColor: (ctx)=> getBackground(ctx.p0.parsed.y), 
          
          // borderColor
      }
    },
  ];
  


  public lineChartLabels: string[] = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm'];

  public lineChartOptions: ChartOptions  = {
    responsive: true,
    
    scales: {
   
      y: {
        grid: {
          drawOnChartArea: false,
          offset: false,
          circular: true,
        },

        angleLines:{
          display: true
        },
    

        

      },

     
    },
  };
  public lineChartLegend = true;




  constructor() {

  }

  ngOnInit(): void {
    console.log(this.lineChartData,'koko')
    // this.initializeChart()
  }
  initializeChart(): void {
    const canvas: any = document.getElementById('lineChartCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.2)');
    gradient.addColorStop(.1, 'rgba(0, 255, 0, 0.2)');
    gradient.addColorStop(.2, 'cyan');
    gradient.addColorStop(.5, 'yellow');
    gradient.addColorStop(.6, 'red');

    gradient.addColorStop(.7, 'rgba(0, 255, 0, 0.2)');
    gradient.addColorStop(.8, 'rgba(255, 200, 0, 0.2)');
    gradient.addColorStop(.9, 'black');
    gradient.addColorStop(1, 'blue');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData,
      },
      options: {
        responsive: true,
        // scales: {
        //   x: [{ gridLines: { display: false } }],
        //   y: [{ gridLines: { display: false } }],
        // },
      },
      plugins: [
        {
          id: '1',
          afterDraw: (chart) => {
            const ctx = chart.ctx;
            const scales = chart.scales;

            const dataset = chart.config.data.datasets[0];
            const points = dataset.data.map((value: number, index) => ({
              x: scales['x'].getPixelForTick(index) as number,
              y: scales['y'].getPixelForValue(value) as number,
            }));

            ctx.save();

            for (let i = 0; i < points.length - 1; i++) {
              const p0 = points[i];
              const p1 = points[i + 1];

              ctx.beginPath();
              ctx.moveTo(p0.x, scales['y'].bottom);
              ctx.lineTo(p0.x, p0.y);
              ctx.lineTo(p1.x, p1.y);
              ctx.lineTo(p1.x, scales['y'].bottom);
              ctx.closePath();

              // Use ctx.fillStyle to set the background color
              ctx.fillStyle = gradient;
              ctx.fill();
            }

            ctx.restore();
          },
        },
      ],
    });
  }

}
