import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgChartsModule } from 'ng2-charts';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from '../shared/shared.module';
import { ChartComponent } from './components/chart/chart.component';
import { DetailedChartComponent } from './components/detailed-chart/detailed-chart.component';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { OverviewComponent } from './components/overview/overview.component';
import { SeverityBarComponent } from './components/severity-bar/severity-bar.component';
import { SummaryComponent } from './components/summary/summary.component';
import { StationsRoutingModule } from './stations-routing.module';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ]
})
export class StationsModule { }
