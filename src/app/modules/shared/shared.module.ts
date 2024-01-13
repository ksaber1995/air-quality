import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';


const DeclarationsExports = [
  BreadCrumbComponent
]

const ImportsExports = [
  NzGridModule
]

@NgModule({
  declarations: [
      ...DeclarationsExports
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...ImportsExports
    
  ],
  exports: [
    ...ImportsExports,
    ...DeclarationsExports
  ]
})
export class SharedModule { }
