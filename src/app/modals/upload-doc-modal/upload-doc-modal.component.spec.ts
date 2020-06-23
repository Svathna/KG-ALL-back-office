import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocModalComponent } from './upload-doc-modal.component';

describe('UploadDocModalComponent', () => {
  let component: UploadDocModalComponent;
  let fixture: ComponentFixture<UploadDocModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDocModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
