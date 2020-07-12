import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPerMonthComponent } from './tax-per-month.component';

describe('TaxPerMonthComponent', () => {
  let component: TaxPerMonthComponent;
  let fixture: ComponentFixture<TaxPerMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPerMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPerMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
