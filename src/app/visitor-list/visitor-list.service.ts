// visitor-list.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VisitorListService {
  constructor(private http: HttpClient) {}

  getVisitors() {
    return this.http.get('http://localhost:5000/api/v1/customer').pipe(
      map((response: any) => response.OUT_DATA) 
    );
  }
}
