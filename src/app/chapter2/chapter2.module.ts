import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { Chapter2Component } from './chapter2.component';

const routes: Routes = [
  {
    path: '',
    component: Chapter2Component
  }
];

@NgModule({
  declarations: [Chapter2Component],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    NgZorroAntdModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
  ]
})
export class Chapter2Module { }
