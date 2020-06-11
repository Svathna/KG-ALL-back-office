import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMocModalComponent } from './add-moc-modal.component';

describe('AddMocModalComponent', () => {
  let component: AddMocModalComponent;
  let fixture: ComponentFixture<AddMocModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMocModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMocModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
