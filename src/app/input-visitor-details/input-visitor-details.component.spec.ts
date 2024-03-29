import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVisitorDetailsComponent } from './input-visitor-details.component';

describe('InputVisitorDetailsComponent', () => {
  let component: InputVisitorDetailsComponent;
  let fixture: ComponentFixture<InputVisitorDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputVisitorDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputVisitorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
