import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropUploaderComponent } from './drag-drop-uploader.component';

describe('DragDropUploaderComponent', () => {
  let component: DragDropUploaderComponent;
  let fixture: ComponentFixture<DragDropUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
