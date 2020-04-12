import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { Chapter6Component } from './chapter6.component';
import { MapComponent } from './map/map.component';

import { FacilityService } from './service/facility.service';
import { CategoryService } from './service/category.service';

import { LmapEditorComponent } from './lmap-editor/lmap-editor.component';

const routes: Routes = [
  {
      path: '',
      component: Chapter6Component
  }
];


@NgModule({
  declarations: [Chapter6Component, MapComponent, LmapEditorComponent],
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
export class Chapter6Module { }

