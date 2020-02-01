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
