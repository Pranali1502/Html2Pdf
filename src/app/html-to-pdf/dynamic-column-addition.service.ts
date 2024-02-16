import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Observable } from 'rxjs';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class DynamicColumnAdditionService {

  constructor(private http: HttpClient) { }


  getCompanyData(): Observable<any[]> {
    return this.http.get<any[]>('assets/data copy.json');
  }
  
  generatePdfDynamically(companyDataObject: any[]) {
    const keys = Object.keys(companyDataObject[0]);

    if (!companyDataObject || companyDataObject.length === 0) {
      console.error('No data available');
      return;
    }

    // Extract keys from the first object to determine table headers

    let docDefinition: TDocumentDefinitions ={
      pageSize: 'A4',
      pageMargins: [20, 60, 20, 20],
      content:[
        {
          canvas:[
            {
              type: 'rect',
              x: 0,
              y:0,
              w: 600,
              h: 100,
              color: '#34495E'
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
          table:{
            headerRows: 1,
            dontBreakRows: true,
            heights: 20,
            widths: keys.map(() => '*'),
            body:[
              keys.map(key => ({ text: key, style: 'tableHeader' })),
              
              ...companyDataObject.map(company => 
                keys.map(key => 
                  ({ text: company[key], style: 'tableRow' }))),
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
          fontSize: 10,
          color: 'white',
          fillColor: '#5F6A6A',
          margin: [0, 5, 0, 5],
          alignment: 'center',
        },
        tableRow: {
          fontSize: 8,
          color: 'grey',
          alignment: 'center',
          margin: [0, 5, 0, 5],
          noWrap: true
        },
      },
    };
    pdfMake.createPdf(docDefinition).open();
  }
}
