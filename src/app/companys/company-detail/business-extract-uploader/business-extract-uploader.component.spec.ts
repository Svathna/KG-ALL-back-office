import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExtractUploaderComponent } from './business-extract-uploader.component';

describe('BusinessExtractUploaderComponent', () => {
  let component: BusinessExtractUploaderComponent;
  let fixture: ComponentFixture<BusinessExtractUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessExtractUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessExtractUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
