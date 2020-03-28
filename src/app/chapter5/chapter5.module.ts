import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { Chapter5Component } from './chapter5.component';
import { MapComponent } from './map/map.component';

import { FacilityService } from './service/facility.service';
import { CategoryService } from './service/category.service';

const routes: Routes = [
  {
      path: '',
      component: Chapter5Component
  }
];


@NgModule({
  declarations: [Chapter5Component, MapComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }, FacilityService, CategoryService
  ]
})
export class Chapter5Module { }
