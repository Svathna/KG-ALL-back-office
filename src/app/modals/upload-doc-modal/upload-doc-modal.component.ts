import { Component, OnInit, Input, Inject } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { OtherDocument, DocResponse } from '../../model/company.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-doc-modal',
  templateUrl: './upload-doc-modal.component.html',
  styleUrls: ['./upload-doc-modal.component.scss']
})
export class UploadDocModalComponent implements OnInit {
  docForm: FormGroup;
  body: OtherDocument;
  isUploading = false;
  isFetching = false;
  docUrl: string;
  companyId: string;

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadDocModalComponent>,
  ) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.companyId = this.data.companyId ? this.data.companyId : '';
    }
    this.buildDocForm();
  }

  buildDocForm() {
    this.docForm = this.formBuilder.group({
      docUrl: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      titleInKhmer: new FormControl('', [Validators.required]),
    });
  }

  uploadedCompleted(response) {
    const url = response.secure_url;
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
  }

  loadToPdfViewerCompleted() {
    this.isUploading = false;
  }

  save() {
    console.log('yoo');
  }

  cancel() {
    console.log('yiii');
  }

}
