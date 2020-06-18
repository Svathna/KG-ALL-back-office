import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CompanyService } from '../../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { Doc, CompanyDetail, DocResponse } from '../../../model/company.model';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'moc-certificate-uploader',
  templateUrl: './moc-certificate-uploader.component.html',
  styleUrls: ['./moc-certificate-uploader.component.scss']
})
export class MocCertificateUploaderComponent implements OnInit {

  @Input() company: CompanyDetail;

  isUploading = false;
  moc_certificate = '';
  clickEventSubject: Subject<void> = new Subject<void>();

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    if (this.company.docs) {
      this.moc_certificate = this.company.docs.moc_certificate ? this.company.docs.moc_certificate : '';
    }
  }

  uploadedCompleted(response) {
    const moc_certificate = response.secure_url;
    this.uploadToCompany(moc_certificate);
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
  }

  download() {
    if (!this.moc_certificate) {
      return;
    }
    FileSaver.saveAs(this.moc_certificate, 'moc_certificate');
  }

  uploadToCompany(url) {
    if (!this.company || !url) {
      return;
    }
    const value = {
      moc_certificate: url,
      companyId: this.company ? this.company._id : '',
      docId: this.company.docs ? this.company.docs._id : ''
    }
    this.isUploading = true;
    this.companyService.addDocToCompany(value).subscribe((data: DocResponse) => {
      this.isUploading = false;
      if (data.success) {
        this.moc_certificate = data.doc.moc_certificate ? data.doc.moc_certificate : '';
        this.toaster.success('Upload succeseful');
      } else {
        this.toaster.error(data.message ? data.message : 'Error while uploading');
      }
    });
  }

  loadToPdfViewerCompleted() {
    this.isUploading = false;
  }

  uploadNewPDF() {
    this.clickEventSubject.next();
  }

}
