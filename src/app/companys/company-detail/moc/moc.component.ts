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
  pdf = '';
  pdfPages = 0;
  currentPDFpage = 1;

  @Output() addMoc = new EventEmitter<CompanyDetail>();

  constructor() { }

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

  // nextPDFpage() {
  //   this.currentPDFpage = this.currentPDFpage + 1;
  // }

  // previousPDFpage() {
  //   this.currentPDFpage = this.currentPDFpage - 1;
  // }
}
