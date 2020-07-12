import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPerYearComponent } from './tax-per-year.component';

describe('TaxPerYearComponent', () => {
  let component: TaxPerYearComponent;
  let fixture: ComponentFixture<TaxPerYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPerYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPerYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
