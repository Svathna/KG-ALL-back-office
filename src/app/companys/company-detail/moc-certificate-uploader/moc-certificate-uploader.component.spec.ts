import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MocCertificateUploaderComponent } from './moc-certificate-uploader.component';

describe('MocCertificateUploaderComponent', () => {
  let component: MocCertificateUploaderComponent;
  let fixture: ComponentFixture<MocCertificateUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocCertificateUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocCertificateUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
