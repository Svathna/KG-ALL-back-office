import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxPerYearModalComponent } from './add-tax-per-year-modal.component';

describe('AddTaxPerYearModalComponent', () => {
  let component: AddTaxPerYearModalComponent;
  let fixture: ComponentFixture<AddTaxPerYearModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaxPerYearModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxPerYearModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
