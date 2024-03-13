import { VisitorListService } from './visitor-list.service';
import { Component, OnInit } from '@angular/core';
import { Visitor } from './visitor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.component.html',
  styleUrls: ['./visitor-list.component.css'],
})
export class VisitorListComponent implements OnInit {
  visitors: Visitor[] = [];
  filteredVisitors: Visitor[] = [];
  searchTerm: string = '';

  constructor(
    private visitorListService: VisitorListService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getVisitors();
  }

  redirectToInputDetails() {
    this.router.navigate(['/input-visitor-details']);
  }

  getVisitors() {
    this.visitorListService.getVisitors().subscribe(
      (data: Visitor[]) => {
        this.visitors = data;
        this.filteredVisitors = this.visitors;
        this.search();
      },
      (error) => {
        console.error('Error fetching visitors:', error);
      }
    );
  }

  navigateToRoot() {
    this.router.navigate(['/']);
  }

  search() {
    if (this.searchTerm.trim() === '') {
      this.filteredVisitors = this.visitors;
    } else {
      this.filteredVisitors = this.visitors.filter(
        (visitor) =>
          visitor.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          visitor.address
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          visitor.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          visitor.npwp.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          visitor.pic.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          visitor.customer_price_category
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
