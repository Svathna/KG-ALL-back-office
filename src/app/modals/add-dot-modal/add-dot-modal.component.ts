import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dot, DocResponse } from '../../model/company.model';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-add-dot-modal',
  templateUrl: './add-dot-modal.component.html',
  styleUrls: ['./add-dot-modal.component.scss'],
})
export class AddDotModalComponent implements OnInit {

  dotForm: FormGroup;
  isFetching = false;
  companyId: string;
  dot: Dot;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toaster: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDotModalComponent>,
  ) { }

  ngOnInit() {
    this.companyId = this.data.companyId;
    this.dot = this.data.dot;
    if (this.dot) {
      this.buildEditForm();
    } else {
      this.buildNewForm();
    }
  }

  buildNewForm() {
    this.dotForm = this.formBuilder.group({
      dotNumber: new FormControl('', [Validators.required, Validators.min(1)]),
      notedDate: new FormControl('', [Validators.required]),
      notedAtBranch: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required]),
      bankAccountName: new FormControl('', [Validators.required]),
      bankAccountNumber: new FormControl('', [Validators.required]),
      taxationCardNumber: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('0', [Validators.required, Validators.minLength(9)]),
    });
  }

  buildEditForm() {
    if (!this.dot) {
      return;
    }
    const notedDate = moment(this.dot.notedDate).format('YYYY-MM-DD');
    
    this.dotForm = this.formBuilder.group({
      dotNumber: new FormControl(this.dot.dotNumber, [Validators.required, Validators.min(1)]),
      notedDate: new FormControl(notedDate, [Validators.required]),
      notedAtBranch: new FormControl(this.dot.notedAtBranch, [Validators.required]),
      address: new FormControl(this.dot.address, [Validators.required]),
      bankName: new FormControl(this.dot.bankName, [Validators.required]),
      bankAccountName: new FormControl(this.dot.bankAccountName, [Validators.required]),
      bankAccountNumber: new FormControl(this.dot.bankAccountNumber, [Validators.required]),
      taxationCardNumber: new FormControl(this.dot.taxationCardNumber, [Validators.required]),
      phoneNumber: new FormControl(`0${this.dot.phoneNumber}`, [Validators.required, Validators.minLength(9)]),
    });
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if(this.dotForm.invalid && this.companyId) {
      return;
    }
    const value = this.dotForm.value;
    const companyId = this.companyId;
    Object.assign(value, {companyId});
    this.isFetching = true;
    this.companyService.addDotToCompany(value).subscribe((data: DocResponse) => {
      this.isFetching = false;
      if (data && data.success) {
        this.toaster.success("Information added");
        this.dialogRef.close({ success: data.success });
      } else {
        this.toaster.error(data.message ? data.message : 'Server error')
      }
    });
  }

  update() {
    if(this.dotForm.invalid && this.companyId) {
      return;
    }
    const value = this.dotForm.value;
    const companyId = this.companyId;
    const dotId = this.dot._id;
    Object.assign(value, {companyId});
    this.isFetching = true;
    this.companyService.editDotToCompany(dotId, value).subscribe((data: DocResponse) => {
      this.isFetching = false;
      if (data && data.success) {
        this.toaster.success("Information updated");
        this.dialogRef.close({ success: data.success });
      } else {
        this.toaster.error(data.message ? data.message : 'Server error')
      }
    });
  }
}
