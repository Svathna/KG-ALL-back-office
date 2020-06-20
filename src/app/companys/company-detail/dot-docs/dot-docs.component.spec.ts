import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotDocsComponent } from './dot-docs.component';

describe('DotDocsComponent', () => {
  let component: DotDocsComponent;
  let fixture: ComponentFixture<DotDocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotDocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
