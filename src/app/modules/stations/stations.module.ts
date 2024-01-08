import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationsRoutingModule } from './stations-routing.module';
import { ChartComponent } from './components/chart/chart.component';
import { MapComponent } from './components/map/map.component';
import { SummaryComponent } from './components/summary/summary.component';
import { HeaderComponent } from './components/header/header.component';
import { DetailsComponent } from './components/details/details.component';
import { OverviewComponent } from './components/overview/overview.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    ChartComponent,
    MapComponent,
    SummaryComponent,
    HeaderComponent,
    DetailsComponent,
    OverviewComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    StationsRoutingModule
  ]
})
export class StationsModule { }
