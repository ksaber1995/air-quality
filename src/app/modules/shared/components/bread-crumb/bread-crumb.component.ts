import { Component, Input } from '@angular/core';
import { IBreadCrumb } from './model';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss'
})
export class BreadCrumbComponent {
  @Input() target ;
  @Input() routes : Array<IBreadCrumb> = [{link:'/', title:'Tenants'}]
  // @Input() queryParamsHandling : QueryParamsHandling 
  backRoute
  ngOnInit(): void {
    if(this.routes?.length > 0){
      this.backRoute = this.routes[this.routes.length - 1 ].link
    }else{
      this.backRoute = '../'
    }
  }
}
