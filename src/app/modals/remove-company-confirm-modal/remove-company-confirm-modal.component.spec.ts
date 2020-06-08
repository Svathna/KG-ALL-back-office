import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCompanyConfirmModalComponent } from './remove-company-confirm-modal.component';

describe('RemoveCompanyConfirmModalComponent', () => {
  let component: RemoveCompanyConfirmModalComponent;
  let fixture: ComponentFixture<RemoveCompanyConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveCompanyConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCompanyConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
