import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocType, Moc, CompanyDetail } from '../../../model/company.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent implements OnInit {
  @Input() moc: Moc;

  isUploading = false;
  pdf = '';
  pdfPages = 0;
  currentPDFpage = 1;

  @Output() addMoc = new EventEmitter<CompanyDetail>();

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

  uploadedCompletedPDF(response) {
    const pdf = response.secure_url;
    this.pdf = pdf;
    console.log(this.pdf);
  }

  onLoadingPDF(isLoading) {
    console.log(isLoading);
    this.isUploading = isLoading;
  }

  pdfLoaded({_pdfInfo: pdfInfo}) {
    this.pdfPages = pdfInfo.numPages;
  }

  downloadPDF() {
    console.log('yeee');
    if (!this.pdf) {
      return;
    }
    FileSaver.saveAs(this.pdf);
  }
}
