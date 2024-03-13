import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visitor } from './visitor.model';
import { map } from 'rxjs/operators';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
@Injectable({
  providedIn: 'root',
})
export class RequestQueueNUmberService {
  private apiUrl = 'https://example.com/api/visitors';

  constructor(private http: HttpClient) {}

  getVisitors() {
    return this.http
      .get('http://203.194.114.30:5000/api/v1/customer')
      .pipe(map((response: any) => response.OUT_DATA));
  }

  generatePDF(): void {
    const element = document.querySelector(
      '.visitor-form-container2'
    ) as HTMLElement;

    html2canvas(element).then((canvas) => {
      const pdf = new jspdf.jsPDF();
      const imgHeight = (canvas.height * 208) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 0, 0, 208, imgHeight);
      pdf.save('patient_details.pdf');
    });
  }
}
