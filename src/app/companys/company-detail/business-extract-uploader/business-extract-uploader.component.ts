import { Component, OnInit, Input } from '@angular/core';
import { CompanyDetail, DocResponse } from '../../../model/company.model';
import { Subject } from 'rxjs';
import { CompanyService } from '../../../service/company.service';
import { ToastrService } from 'ngx-toastr';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'business-extract-uploader',
  templateUrl: './business-extract-uploader.component.html',
  styleUrls: ['./business-extract-uploader.component.scss']
})
export class BusinessExtractUploaderComponent implements OnInit {
  @Input() company: CompanyDetail;

  isUploading = false;
  business_extract = '';
  clickEventSubject: Subject<void> = new Subject<void>();

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
  ) { }

  ngOnInit() {
    if (this.company.docs) {
      this.business_extract = this.company.docs.business_extract ? this.company.docs.business_extract : '';
    }
  }

  uploadedCompleted(response) {
    const business_extract = response.secure_url;
    this.uploadToCompany(business_extract);
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
  }

  download() {
    if (!this.business_extract) {
      return;
    }
    FileSaver.saveAs(this.business_extract, 'business_extract');
  }

  uploadToCompany(url) {
    if (!this.company || !url) {
      return;
    }
    const value = {
      business_extract: url,
      companyId: this.company ? this.company._id : '',
      docId: this.company.docs ? this.company.docs._id : ''
    }
    this.isUploading = true;
    this.companyService.addDocToCompany(value).subscribe((data: DocResponse) => {
      this.isUploading = false;
      if (data.success) {
        this.business_extract = data.doc.business_extract ? data.doc.business_extract : '';
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
