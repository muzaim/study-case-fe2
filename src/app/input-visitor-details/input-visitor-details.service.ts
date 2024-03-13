import { Injectable } from '@angular/core';
import { Visitor } from './visitor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private apiUrl = '/api/add-visitor';

  constructor(private http: HttpClient) {}

  addCustomer(customerData: any) {
    return this.http.post(
      'http://localhost:5000/api/v1/customer',
      customerData
    );
  }
}
