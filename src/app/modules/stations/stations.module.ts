import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StationsRoutingModule } from './stations-routing.module';
import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';
import { SummaryComponent } from './components/summary/summary.component';
import { DetailsComponent } from './components/details/details.component';
import { OverviewComponent } from './components/overview/overview.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { GoogleMapsModule } from '@angular/google-maps';
import { NgChartsModule } from 'ng2-charts';
import { SeverityBarComponent } from './components/severity-bar/severity-bar.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DetailedChartComponent } from './components/detailed-chart/detailed-chart.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ChartComponent,
    MapComponent,
    SummaryComponent,
    DetailsComponent,
    OverviewComponent,
    HomeComponent,
    SeverityBarComponent,
    DetailedChartComponent,

  ],
  imports: [
    CommonModule,
    StationsRoutingModule,
    SharedModule,
    NzTableModule,
    GoogleMapsModule,
    NgChartsModule,
    NzSelectModule,
    FormsModule,
    NzRadioModule,
    NzDatePickerModule,
    NzDividerModule,
    NzCheckboxModule,
    CarouselModule,
  
  ]
})
export class StationsModule { }
