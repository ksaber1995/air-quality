import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatInputModule } from '@angular/material/input';



import {
  StepBackwardOutline,
  CaretLeftOutline,
  SettingOutline,
  ArrowUpOutline
} from '@ant-design/icons-angular/icons';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { IconDefinition } from '@ant-design/icons-angular';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  NzCheckboxModule,
  ReactiveFormsModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule
  
]

@NgModule({
  declarations: [
      ...DeclarationsExports,
      LoginComponent,
      
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
