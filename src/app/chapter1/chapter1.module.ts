import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from "@angular/router";
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {Chapter1Component} from "./chapter1.component";

const routes: Routes = [
    {
        path: '',
        component: Chapter1Component
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgZorroAntdModule
    ],
    declarations: [Chapter1Component],
     /** 配置 ng-zorro-antd 国际化（文案 及 日期） **/
    providers   : [
        { provide: NZ_I18N, useValue: zh_CN }
    ]
})
export class Chapter1Module {
}
