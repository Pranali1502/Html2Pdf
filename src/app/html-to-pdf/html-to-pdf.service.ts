import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { style } from '@angular/animations';
import { color } from 'html2canvas/dist/types/css/types/color';
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
      pageMargins:[40, 60, 40, 60],
        content: [
          {
            canvas: [
                {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 600,
                    h: 135,
                    color: '#484C59', 
                }
            ],
            absolutePosition: { x: 0, y: 0 },
        },
          { text: 'Company Report', style: 'header' },
          { text: 'Sample Company Inc', style: {alignment: 'center', color: 'white',italics: true} },
          { text: '123, Main Street, Cityville, state, country',style: 'subheader'},
          
          {
            style: 'tableExample',
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
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
                  company.companyName,
                  company.Founded,
                  company.companySize,
                  company.Specialities,
                  company.Website,
                ]), 
              ]
            },
            margin: [0, 10, 0, 0],
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
            color: 'white',
            alignment:'center',
            
          },
          subheader:{
            fontSize: 11,
            bold: true,
            margin: [0, 0, 0, 20],
            italics: true,
            color: 'white',
            alignment:'center'
          },
          tableExample:{
            margin: [0, 30, 0, 10],
          },
          tableHeader:{
            bold: true,
            fontSize: 11,
            color: 'white',
            fillColor: '#ABAEB8'
          }
        }
      };

      pdfMake.createPdf(docDefinition).open();
  }
}

//   const docDefinition= {
//     content: [
//       {text: 'Company Report', style: 'header'},
//       {text: 'Sample Company Inc', style: 'subheader'},
//       {text: '123, Main Street, Cityville, state, country', style: 'subheader'},
//       {
//         table: {
//           headerRows: 1,
//           widths: ['*','*','*','*','*'],
//           body:[
//             ['Company Name','Founded Year','Company Size','Specialities','Website'],
//             ...companyDataObject.map(company =>[
//               company.companyName,
//               company.Founded,
//               company.companySize,
//               company.Specialities,
//               company.Website,
//             ])
//           ]
//         }
//       }
//     ],
//     styles: {
//       header:{
//         fontSize: 22,
//         bold: true
//       },
//       subheader:{
//         fontSize: 12,
//         bold: false,
//         italics: true,
//       }
//     }
// };
// pdfMake.createPdf(docDefinition).open();
// { fontSize: 18, bold: true, margin: [0, 0, 0, 10] }
