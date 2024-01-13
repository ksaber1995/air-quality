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


@NgModule({
  declarations: [
    ChartComponent,
    MapComponent,
    SummaryComponent,
    DetailsComponent,
    OverviewComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    StationsRoutingModule,
    SharedModule,
    NzTableModule,
    GoogleMapsModule,
    NgChartsModule

  ]
})
export class StationsModule { }
