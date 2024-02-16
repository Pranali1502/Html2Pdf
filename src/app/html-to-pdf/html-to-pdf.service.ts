import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class HtmlToPdfService {
  constructor(private http: HttpClient) {}

  getCompanyData(): Observable<any[]> {
    return this.http.get<any[]>('assets/data.json');
  }

  generatePdf(companyDataObject: any[]) {
    
    let docDefinition: TDocumentDefinitions = {
      pageSize: 'A4',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 600,
              h: 100,
              color: '#34495E',
            },
          ],
          absolutePosition: { x: 0, y: 0 },
        },
        { text: 'Company Report', style: 'header' },
        {
          text: 'Sample Company Inc.', style: 'textHeader' },
        {
          text: '123, Main Street, Cityville, state, country',
          style: 'subheader',
        },

        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            dontBreakRows: true,  //for not breaking rows and inheriting the row height
				    // keepWithHeaderRows: 1,
            heights: 20,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Company Name', style: 'tableHeader' },
                { text: 'Founded Year', style: 'tableHeader' },
                { text: 'Company Size', style: 'tableHeader' },
                { text: 'Specialities', style: 'tableHeader' },
                { text: 'Website', style: 'tableHeader' },
              ],
              ...companyDataObject.map((company) => [
                { text: company.companyName, style: 'tableRow' },
                { text: company.Founded, style: 'tableRow' },
                { text: company.companySize, style: 'tableRow' },
                { text: company.Specialities.join(' , '), style: 'tableRow' },
                { text: company.Website, style: 'tableRow' },
              ]),
            ],
          },
          layout: {
            // defaultBorder:false,
            hLineWidth: function (i, node) {
              return 0;
            },
            vLineWidth: function (i, node) {
              return 0;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex % 2 === 0 ? '#D7DBDD' : null;
            },
         
          },
         
          margin: [0, 10, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, -40, 0, 10],
          color: 'white',
          alignment: 'center',
        },
        subheader: {
          fontSize: 11,
          bold: true,
          margin: [0, 0, 0, 20],
          italics: true,
          color: 'white',
          alignment: 'center',
        },
        textHeader:{
          alignment: 'center',
          color: 'white', 
          italics: true, 
          margin:[0,0,0,10],
          fontSize: 10
        },
        tableExample: {
          margin: [0, 30, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 11,
          color: 'white',
          fillColor: '#5F6A6A',
          margin: [0, 5, 0, 5],
          alignment: 'center',
        },
        tableRow: {
          fontSize: 10,
          color: 'grey',
          alignment: 'center',
          margin: [0, 5, 0, 5]
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }
  
}



//layout:{
  //with borders
  // hLineWidth: function (i, node) {
            //   if (i === 0 || i === node.table.body.length) {
            //     return 0;
            //   }
            //   return (i === node.table.headerRows) ? 2 : 1;
            // },
            // vLineWidth: function (i) {
            //   return 0;
            // },
            // hLineColor: function (i) {
            //   return i === 1 ? 'black' : '#aaa';
            // },
            // paddingLeft: function (i) {
            //   return i === 0 ? 0 : 8;
            // },
            // paddingRight: function (i, node) {
            //   return (i === node.table.widths.length - 1) ? 0 : 8;
            // }

             // layout:'headerLineOnly',
          //  'lightHorizontalLines',
// }