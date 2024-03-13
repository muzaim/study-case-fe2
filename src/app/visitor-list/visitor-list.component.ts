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
  visitors: any[] = [];

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
      (data: any) => {
        this.visitors = data;
      },
      (error) => {
        console.error('Error fetching visitors:', error);
      }
    );
  }
}
