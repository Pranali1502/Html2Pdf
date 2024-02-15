import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HtmlToPdfService } from './html-to-pdf.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-html-to-pdf',
  templateUrl: './html-to-pdf.component.html',
  styleUrls: ['./html-to-pdf.component.css'],
})
export class HtmlToPdfComponent implements OnInit{
  companyDataObject: any[]=[];

  constructor(private h2pService: HtmlToPdfService) {}
  
  ngOnInit(): void {
    this.h2pService.getCompanyData().subscribe(data=>{
       this.companyDataObject=data;
    });
  }

  generatePdf(): void {
    this.h2pService.generatePdf(this.companyDataObject);
  }
}
