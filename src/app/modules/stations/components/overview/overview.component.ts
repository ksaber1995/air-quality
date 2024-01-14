import { Component } from '@angular/core';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';
import { airQualityItems } from '../../../shared/model/air-quality';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  airQualityItems = airQualityItems;
  type = 'all'
  routes: IBreadCrumb[] = [
    {
      title: 'Home',
      link: '/'
    }
  ];

}
