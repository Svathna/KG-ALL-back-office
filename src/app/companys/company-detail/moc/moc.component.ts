import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Moc, CompanyDetail } from '../../../model/company.model';
import { COMPANY_TYPE } from '../../../modals/add-moc-modal/add-moc-modal.component';
import * as moment from 'moment';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent {
  @Input() moc: Moc;

  @Output() addMoc = new EventEmitter<CompanyDetail>();
  @Output() editMoc = new EventEmitter<CompanyDetail>();

  companyType = COMPANY_TYPE;
  moment: any = moment;

  constructor() {}

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

  onEditMoc(event) {
    this.editMoc.emit(event)
  }
}
