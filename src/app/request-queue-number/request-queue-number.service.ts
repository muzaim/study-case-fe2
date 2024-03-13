import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visitor } from './visitor.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestQueueNUmberService {
  private apiUrl = 'https://example.com/api/visitors';

  constructor(private http: HttpClient) {}

  getVisitors() {
    return this.http
      .get('http://localhost:5000/api/v1/customer')
      .pipe(map((response: any) => response.OUT_DATA));
  }
}
