import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { Chapter3Component } from './chapter3.component';
import { DataComponent } from './data/data.component';
import { ConfigComponent } from './config/config.component';
import { IndexedResolver } from './indexed-resolver';

const routes: Routes = [
  {
      path: '',
      component: Chapter3Component,
      resolve: {
        db: IndexedResolver
      },
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
  declarations: [Chapter3Component, DataComponent, ConfigComponent],
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
export class Chapter3Module { }
