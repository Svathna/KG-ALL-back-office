import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Moc, CompanyDetail, CompanyType } from '../../../model/company.model';
import { COMPANY_TYPE_IN_KHMER } from '../../../modals/add-moc-modal/add-moc-modal.component';
import * as moment from 'moment';
import { Observable } from 'rxjs';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent implements OnChanges {
  @Input() moc: Moc;

  @Output() addMoc = new EventEmitter<CompanyDetail>();
  @Output() editMoc = new EventEmitter<CompanyDetail>();

  companyTypeInKhmer = COMPANY_TYPE_IN_KHMER;
  notedDate: any;
  annualTranscriptMaintenanceDate: any;

  constructor() {}

  ngOnChanges(change) {
    if (this.moc) {
      this.notedDate = moment(this.moc.notedDate).format('DD-MM-YYYY');
      this.annualTranscriptMaintenanceDate = moment(this.moc.annualTranscriptMaintenanceDate).format('DD-MM-YYYY');
    }
  }

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

  onEditMoc(event) {
    this.editMoc.emit(event)
  }
}
