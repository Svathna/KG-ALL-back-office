import { Component, OnInit, Input, Inject } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { OtherDocument, DocResponse } from '../../model/company.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';

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
  docId: string = '';

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UploadDocModalComponent>,
  ) { }

  ngOnInit() {
    if (this.data) {
      this.companyId = this.data.companyId ? this.data.companyId : '';
      this.docId = this.data.docId ? this.data.docId : '';
    }
    this.buildDocForm();
  }

  buildDocForm() {
    this.docForm = this.formBuilder.group({
      docUrl: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      titleInKhmer: new FormControl('', [Validators.required]),
      companyId: new FormControl(this.companyId, [Validators.required]),
      docId: new FormControl(this.docId),
    });
  }

  uploadedCompleted(response) {
    this.docUrl = response.secure_url;
    this.docForm.controls['docUrl'].setValue(this.docUrl);
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
  }

  loadToPdfViewerCompleted() {
    this.isUploading = false;
  }

  save() {
    if (this.docForm.invalid) {
      return;
    }
    this.isFetching = true;
    const value = this.docForm.value;
    this.companyService.addDocToCompany(value).subscribe((data: DocResponse) => {
      this.isFetching = false;
      if (data && data.success) {
        this.dialogRef.close({ success: data.success });
      } else {
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
