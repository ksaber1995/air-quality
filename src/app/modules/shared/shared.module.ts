import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzRadioModule } from 'ng-zorro-antd/radio';

const DeclarationsExports = [
  BreadCrumbComponent,
]

const ImportsExports = [
  NzGridModule,
  NzButtonModule,
  NzIconModule,
  NzDropDownModule,
  NzRadioModule
]

@NgModule({
  declarations: [
      ...DeclarationsExports,
      
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
