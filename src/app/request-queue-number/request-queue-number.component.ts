import { Component, OnInit } from '@angular/core';
import { Visitor } from './visitor.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RequestQueueNUmberService } from './request-queue-number.service';
@Component({
  selector: 'app-request-queue-number',
  templateUrl: './request-queue-number.component.html',
  styleUrls: ['./request-queue-number.component.css'],
})
export class RequestQueueNumberComponent implements OnInit {
  visitors: Visitor[] = [];
  nextPatient: Visitor | undefined;

  queueNumber: string = 'A001';
  currentTime: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private RequestQueueNUmberService: RequestQueueNUmberService
  ) {
    this.getCurrentTime();
  }

  generatePDF(): void {
    this.RequestQueueNUmberService.generatePDF();
  }

  getCurrentTime() {
    const currentDate = new Date();
    this.currentTime = currentDate.toLocaleTimeString();
  }

  ngOnInit(): void {
    this.getVisitors();
  }
  navigateToRoot() {
    this.router.navigate(['/']);
  }
  getVisitors(): void {
    this.http.get<any>('http://203.194.114.30:5000/api/v1/customer').subscribe(
      (response) => {
        if (response.OUT_DATA && response.OUT_DATA.length > 0) {
          this.visitors = response.OUT_DATA.map((visitor: any, index: any) => ({
            ...visitor,
            queueNumber: index + 1,
          }));
          console.log(
            'Calling patient:',
            this.visitors[0].name,
            'Queue Number:',
            this.visitors[0].queueNumber
          );
        } else {
          console.log('No patients in the queue.');
        }
      },
      (error) => {
        console.error('Failed to fetch visitor data:', error);
      }
    );
  }

  requestQueueNumber(): void {
    if (this.visitors.length > 0) {
      console.log('Calling next patient:', this.nextPatient?.name);
      this.visitors.shift();
      this.updateNextPatient();
      this.generatePDF();
    } else {
      console.log('No patients in the queue.');
      this.nextPatient = undefined;
    }

    const queueNumberWithoutPrefix = parseInt(this.queueNumber.substring(1));
    const nextQueueNumber =
      'A' + (queueNumberWithoutPrefix + 1).toString().padStart(4, '0');
    this.queueNumber = nextQueueNumber;
  }

  updateNextPatient(): void {
    if (this.visitors.length > 0) {
      this.nextPatient = this.visitors[0];
    } else {
      this.nextPatient = undefined;
    }
  }
}
