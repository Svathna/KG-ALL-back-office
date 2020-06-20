import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MocDocsComponent } from './moc-docs.component';

describe('MocDocsComponent', () => {
  let component: MocDocsComponent;
  let fixture: ComponentFixture<MocDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MocDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MocDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
