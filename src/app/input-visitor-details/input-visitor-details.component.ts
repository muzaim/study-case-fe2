import { Component, OnInit } from '@angular/core';
import { Visitor } from './visitor.model';
import { VisitorService } from './input-visitor-details.service';
import { NgForm } from '@angular/forms';
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
  picOptions: string[] = ['Dr. Tirta', 'Dr. Fauzan', 'Dr. Mahendra'];
  diseaseCategoryOptions: string[] = [
    'Poliklinik Anak',
    'Poliklinik Penyakit Dalam',
    'Poliklinik Bedah Umum',
    'Poliklinik Bedah Onkologi',
    'Poliklinik Mata',
  ];
  showSuccess: boolean = false;
  ngOnInit(): void {}

  constructor(private visitorService: VisitorService) {}

  onSubmit(visitorForm: NgForm) {
    if (visitorForm.valid) {
      this.visitorService.addCustomer(this.visitor).subscribe(
        (response) => {
          console.log('Customer added successfully:', response);
          this.showSuccess = true;

          setTimeout(() => {
            visitorForm.resetForm();
            this.showSuccess = false;
          }, 3000);
        },
        (error) => {
          console.error('Error adding customer:', error);
        }
      );
    }
  }
}
