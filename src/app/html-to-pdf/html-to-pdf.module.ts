import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlToPdfComponent } from './html-to-pdf.component';



@NgModule({
  declarations: [
  HtmlToPdfComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HtmlToPdfComponent
  ]
})
export class HtmlToPdfModule { }
