import { Component, OnInit } from '@angular/core';
import { Visitor } from './visitor.model';
import { VisitorService } from './input-visitor-details.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-input-visitor-details',
  templateUrl: './input-visitor-details.component.html',
  styleUrls: ['./input-visitor-details.component.css'],
})
export class InputVisitorDetailsComponent implements OnInit {
  visitor: Visitor = {
    id: 0,
    name: '',
    address: '',
    npwp: '',
    pic: '',
    phone: '',
    customer_price_category: '',
  };
  picOptions: string[] = [
    'Dr. Tirta',
    'Dr. Fauzan',
    'Dr. Mahendra',
    'Dr Adi',
    'Dr Sulaiman',
  ];
  diseaseCategoryOptions: string[] = [
    'Poliklinik Anak',
    'Poliklinik Penyakit Dalam',
    'Poliklinik Bedah Umum',
    'Poliklinik Bedah Onkologi',
    'Poliklinik Mata',
  ];
  showSuccess: boolean = false;
  ngOnInit(): void {}

  constructor(private visitorService: VisitorService, private router: Router) {}
  navigateToRoot() {
    this.router.navigate(['/']);
  }
  onSubmit(visitorForm: NgForm) {
    if (visitorForm.valid) {
      this.visitorService.addCustomer(this.visitor).subscribe(
        (response) => {
          console.log('Customer added successfully:', response);
          this.showSuccess = true;

          setTimeout(() => {
            visitorForm.resetForm();
            this.showSuccess = false;
          }, 1000);
        },
        (error) => {
          console.error('Error adding customer:', error);
        }
      );
    }
  }
}
