import { Component, OnInit } from '@angular/core';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { HtmlToPdfService } from './html-to-pdf.service';
import { DynamicColumnAdditionService } from './dynamic-column-addition.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-html-to-pdf',
  templateUrl: './html-to-pdf.component.html',
  styleUrls: ['./html-to-pdf.component.css'],
})
export class HtmlToPdfComponent implements OnInit{
  companyDataObject: any[]=[];
  dynamicData: any[]=[];
  headerData: any[]= [];
  rowData: any[] =[];

  constructor(private h2pService: HtmlToPdfService,
    private dynamicService: DynamicColumnAdditionService) {}
  
  ngOnInit(): void {
    this.h2pService.getCompanyData().subscribe(data=>{
       this.companyDataObject=data;
    });
    this.dynamicService.getCompanyData().subscribe(data =>{
      this.dynamicData= data;
    });
    this.dynamicService.getHeaderData().subscribe(data=>{
      this.headerData=data;
    });
    this.dynamicService.getRowData().subscribe(data=>{
      this.rowData=data;
    });
  }

  generatePdf(): void {
    this.h2pService.generatePdf(this.companyDataObject);
  }

  generatePdfDynamically():void{
    this.dynamicService.generatePdfDynamically(this.dynamicData);
  }

  generatePdfSeparate():void{
    
    console.log('Header Data:',this.headerData);
console.log('Row Data:',this.rowData);
    
    this.dynamicService.generatePdfSeparate(this.headerData, this.rowData);
  }
}
