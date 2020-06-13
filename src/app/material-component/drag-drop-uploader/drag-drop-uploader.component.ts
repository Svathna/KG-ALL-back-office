import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drag-drop-uploader',
  templateUrl: './drag-drop-uploader.component.html',
  styleUrls: ['./drag-drop-uploader.component.scss']
})
export class DragDropUploaderComponent implements OnInit {
  dragOver = false;

  @Input() multiple = false;
  @Output() uploadDoc = new EventEmitter<File>();
  constructor() { }

  ngOnInit() { }

  setDragOver(dragOver: boolean, event?) {
    this.dragOver = dragOver;
    if (event) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    }
  }

  uploadDocument(event) {
    event.preventDefault();
    this.dragOver = false;
    this.uploadDoc.emit(event);
  }

}
