import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocType, Moc, CompanyDetail, DocResponse } from '../../../model/company.model';
import { CompanyService } from '../../../service/company.service';
import { ToastrService } from 'ngx-toastr';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent implements OnInit {
  @Input() moc: Moc;
  @Input() company: CompanyDetail;

  isMocCertificateUploading = false;
  moc_certificate = '';
  business_extract = '';

  @Output() addMoc = new EventEmitter<CompanyDetail>();

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    this.moc_certificate = this.company.docs.moc_certificate ? this.company.docs.moc_certificate : '';
    this.business_extract = this.company.docs.business_extract ? this.company.docs.business_extract : '';
  }

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

  uploadedCompletedMocCertificate(response) {
    const moc_certificate = response.secure_url;
    console.log(moc_certificate);
    console.log(response.secure_url)
    // this.moc_certificate = moc_certificate;
    this.uploadMocCertificateToCompany(moc_certificate);
  }

  mocCertificateLoaded(event) {

  }

  onLoadingMocCertificate(isLoading) {
    return;
  }

  downloadMocCertificate() {
    if (!this.moc_certificate) {
      return;
    }
    FileSaver.saveAs(this.moc_certificate, 'moc_certificate');
  }

  uploadMocCertificateToCompany(url) {
    console.log(this.company);
    if (!this.company || !url) {
      return;
    }
    const value = {
      moc_certificate: url,
      companyId: this.company ? this.company._id : '',
      docId: this.company.docs ? this.company.docs._id : ''
    }
    console.log(value);
    this.isMocCertificateUploading = true;
    this.companyService.addDocToCompany(value).subscribe((data: DocResponse) => {
      this.isMocCertificateUploading = false;
      if (data.success) {
        this.moc_certificate = data.doc.moc_certificate ? data.doc.moc_certificate : '';
        this.toaster.success('Upload succeseful');
      } else {
        this.toaster.error(data.message ? data.message : 'Error while uploading');
      }
    });
  }

  cancelMocCertificate() {
    this.moc_certificate = '';
  }
}
