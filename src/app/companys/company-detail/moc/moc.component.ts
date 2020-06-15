import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocType, Moc, CompanyDetail, DocResponse, CompanyType } from '../../../model/company.model';
import { CompanyService } from '../../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { COMPANY_TYPE_IN_KHMER } from '../../../modals/add-moc-modal/add-moc-modal.component';
import * as moment from 'moment';

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

  @Output() addMoc = new EventEmitter<CompanyDetail>();
  @Output() editMoc = new EventEmitter<CompanyDetail>();

  isMocCertificateUploading = false;
  moc_certificate = '';
  business_extract = '';
  companyTypeInKhmer = COMPANY_TYPE_IN_KHMER;
  notedDate: any;

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
    this.notedDate = moment(this.moc.notedDate).format('DD-MM-YYYY');
    if (this.company.docs) {
      this.moc_certificate = this.company.docs.moc_certificate ? this.company.docs.moc_certificate : '';
      this.business_extract = this.company.docs.business_extract ? this.company.docs.business_extract : '';
    }
  }

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

  onEditMoc(event) {
    this.editMoc.emit(event)
  }

  uploadedCompletedMocCertificate(response) {
    const moc_certificate = response.secure_url;
    this.uploadMocCertificateToCompany(moc_certificate);
  }

  onLoading(isLoading) {
    return;
  }

  downloadMocCertificate() {
    if (!this.moc_certificate) {
      return;
    }
    FileSaver.saveAs(this.moc_certificate, 'moc_certificate');
  }

  uploadMocCertificateToCompany(url) {
    if (!this.company || !url) {
      return;
    }
    const value = {
      moc_certificate: url,
      companyId: this.company ? this.company._id : '',
      docId: this.company.docs ? this.company.docs._id : ''
    }
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
 
  uploadedCompletedBusinessExtract(response) {
    const business_extract = response.secure_url;
    this.uploadBusinessExtractToCompany(business_extract);
  }

  downloadBusinessExtract() {
    if (!this.business_extract) {
      return;
    }
    FileSaver.saveAs(this.business_extract, 'business_extract');
  }

  uploadBusinessExtractToCompany(url) {
    if (!this.company || !url) {
      return;
    }
    const value = {
      business_extract: url,
      companyId: this.company ? this.company._id : '',
      docId: this.company.docs ? this.company.docs._id : ''
    }
    this.companyService.addDocToCompany(value).subscribe((data: DocResponse) => {
      if (data.success) {
        this.business_extract = data.doc.business_extract ? data.doc.business_extract : '';
        this.toaster.success('Upload succeseful');
      } else {
        this.toaster.error(data.message ? data.message : 'Error while uploading');
      }
    });
  }
}
