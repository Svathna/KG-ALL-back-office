import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocType, Moc, CompanyDetail } from '../../../model/company.model';

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent implements OnInit {
  @Input() moc: Moc;

  isUploading = false;

  @Output() addMoc = new EventEmitter<CompanyDetail>();

  constructor() { }

  ngOnInit() {
  }

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

  uploadedCompletedPDF(response) {
    console.log(response);
  }

  onLoadingPDF(isLoading) {
    console.log(isLoading);
    this.isUploading = isLoading;
  }
}
