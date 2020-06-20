import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Dot } from '../../../model/company.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class DotComponent implements OnChanges {

  @Input() dot: Dot;

  @Output() addDot = new EventEmitter<any>();
  @Output() editDot = new EventEmitter<any>();

  notedDate: any;

  constructor() {}

  ngOnChanges() {
    if (this.dot) {
      this.notedDate = moment(this.dot.notedDate).format('DD-MM-YYYY');
    }
  }

  onAddDot(event) {
    this.addDot.emit(event);
  }

  onEditDot(event) {
    this.editDot.emit(event)
  }
}
