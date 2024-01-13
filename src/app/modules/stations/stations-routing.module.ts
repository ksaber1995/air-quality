import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'overview',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationsRoutingModule { }
