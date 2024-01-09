import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NzGridModule } from 'ng-zorro-antd/grid';


const ImportsExports = [
  NzGridModule
]

@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    ...ImportsExports
    
  ],
  exports: [
    ...ImportsExports
  ]
})
export class SharedModule { }
