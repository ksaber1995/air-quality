import { Component } from '@angular/core';
import { IBreadCrumb } from '../../../shared/components/bread-crumb/model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
  routes: IBreadCrumb[]  = [
    {
        title: 'Home',
        link: '/'
    }
];

}
