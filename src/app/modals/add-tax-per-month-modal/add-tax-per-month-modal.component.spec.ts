import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxPerMonthModalComponent } from './add-tax-per-month-modal.component';

describe('AddTaxPerMonthModalComponent', () => {
  let component: AddTaxPerMonthModalComponent;
  let fixture: ComponentFixture<AddTaxPerMonthModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTaxPerMonthModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaxPerMonthModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
