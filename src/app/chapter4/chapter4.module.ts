import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { Chapter4Component } from './chapter4.component';
import { DataComponent } from './data/data.component';
import { ConfigComponent } from './config/config.component';
import { FacilityService } from './service/facility.service';
import { CategoryService } from './service/category.service';

const routes: Routes = [
  {
      path: '',
      component: Chapter4Component,
      children: [
          {
              path: 'data',
              component: DataComponent
          },
          {
              path: 'config',
              component: ConfigComponent
          },
          {
              path: '**',
              redirectTo: 'data'
          }
      ]
  }, {
      path: '**',
      redirectTo: 'data'
  }
];

@NgModule({
  declarations: [Chapter4Component, DataComponent, ConfigComponent],
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
export class Chapter4Module { }