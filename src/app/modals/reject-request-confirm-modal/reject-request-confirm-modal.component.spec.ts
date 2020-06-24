import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRequestConfirmModalComponent } from './reject-request-confirm-modal.component';

describe('RejectRequestConfirmModalComponent', () => {
  let component: RejectRequestConfirmModalComponent;
  let fixture: ComponentFixture<RejectRequestConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectRequestConfirmModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectRequestConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
