import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";



import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ArrowUpOutline
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { TranslateModule } from '@ngx-translate/core';
const icons: IconDefinition[] = [
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ArrowUpOutline
];


const DeclarationsExports = [
  BreadCrumbComponent,
  StatusIconComponent,

]

const ImportsExports = [
  NzGridModule,
  NzButtonModule,
  NzDropDownModule,
  NzRadioModule,
  HttpClientModule,
  NgxSpinnerModule,

]

@NgModule({
  declarations: [
      ...DeclarationsExports,
      
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    ...ImportsExports,
    NzIconModule.forChild(icons)
    
  ],
  exports: [
    ...ImportsExports,
    ...DeclarationsExports,
    NzIconModule
  ]
})
export class SharedModule { }
