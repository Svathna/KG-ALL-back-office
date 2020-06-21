import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Dot } from '../../../model/company.model';
import * as moment from 'moment';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss']
})
export class DotComponent {

  @Input() dot: Dot;

  @Output() addDot = new EventEmitter<any>();
  @Output() editDot = new EventEmitter<any>();

  moment: any = moment;

  constructor() {}

  onAddDot(event) {
    this.addDot.emit(event);
  }

  onEditDot(event) {
    this.editDot.emit(event)
  }
}
