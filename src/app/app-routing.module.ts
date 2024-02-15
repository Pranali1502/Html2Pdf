import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'html-to-pdf', loadChildren: () => import('./html-to-pdf/html-to-pdf.module').then(m => m.HtmlToPdfModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
