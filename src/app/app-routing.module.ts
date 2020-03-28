import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'chapter1',
          loadChildren: './chapter1/chapter1.module#Chapter1Module'
        },
        {
          path: 'chapter2',
          loadChildren: './chapter2/chapter2.module#Chapter2Module'
        },
        {
          path: 'chapter3',
          loadChildren: './chapter3/chapter3.module#Chapter3Module'
        },
        {
          path: 'chapter4',
          loadChildren: './chapter4/chapter4.module#Chapter4Module'
        },
        {
          path: 'chapter5',
          loadChildren: './chapter5/chapter5.module#Chapter5Module'
        },
        {
          path: '**',
          redirectTo: 'chapter1'
        }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
