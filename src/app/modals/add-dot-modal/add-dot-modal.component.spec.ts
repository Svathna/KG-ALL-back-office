import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDotModalComponent } from './add-dot-modal.component';

describe('AddDotModalComponent', () => {
  let component: AddDotModalComponent;
  let fixture: ComponentFixture<AddDotModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDotModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDotModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
