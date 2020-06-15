import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MocResponse, CompanyType, Moc } from '../../model/company.model';
import * as moment from 'moment';
// import 'moment/locale/km';


export const COMPANY_TYPE_IN_KHMER = [
  '',
  'សហគ្រាសឯកបុគ្គល',
  'ក្រុមហ៊ុនឯកជនទទួលខុសត្រូវមានកម្រិត',
  'ក្រុមហ៊ុនមហាជនទទួលខុសត្រូវមានកម្រិត',
]

@Component({
  selector: 'app-add-moc-modal',
  templateUrl: './add-moc-modal.component.html',
  styleUrls: ['./add-moc-modal.component.scss']
})
export class AddMocModalComponent implements OnInit {

  mocForm: FormGroup;
  isFetching = false;
  passwordVisible = false;
  companyId: string;
  companyTypeInKhmer = COMPANY_TYPE_IN_KHMER;
  companyType = CompanyType;
  moc: Moc;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toaster: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMocModalComponent>,
  ) { }

  ngOnInit() {
    this.companyId = this.data.companyId;
    this.moc = this.data.moc;
    console.log('Moc', this.moc);
    console.log('Data', this.data)
    if (this.moc) {
      this.buildEditForm();
    } else {
      this.buildNewForm();
    }
  }

  buildNewForm() {
    this.mocForm = this.formBuilder.group({
      mocNumber: new FormControl('', [Validators.required, Validators.min(1)]),
      notedDate: new FormControl('', [Validators.required]),
      capital: new FormControl('', [Validators.required, Validators.min(1)]),
      // dateOfBTV: new FormControl('', [Validators.required]),
      companyType: new FormControl('', [Validators.required]),
      mocUsernameLogin: new FormControl('', [Validators.required]),
      mocPasswordLogin: new FormControl('', [Validators.required]),
    });
  }

  buildEditForm() {
    if (!this.moc) {
      return;
    }
    const notedDate = moment(this.moc.notedDate);
    this.mocForm = this.formBuilder.group({
      mocNumber: new FormControl(this.moc.mocNumber, [Validators.required, Validators.min(1)]),
      notedDate: new FormControl(notedDate.format('YYYY-MM-DD'), [Validators.required]),
      capital: new FormControl(this.moc.capital, [Validators.required, Validators.min(1)]),
      // dateOfBTV: new FormControl('', [Validators.required]),
      companyType: new FormControl(this.moc.companyType, [Validators.required]),
      mocUsernameLogin: new FormControl(this.moc.mocUsernameLogin, [Validators.required]),
      mocPasswordLogin: new FormControl(this.moc.mocPasswordLogin, [Validators.required]),
    });
  }

  passwordEyeOffOnn() {
    this.passwordVisible = !this.passwordVisible;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if(this.mocForm.invalid && this.companyId) {
      return;
    }
    const value = this.mocForm.value;
    const companyId = this.companyId;
    Object.assign(value, {companyId});
    this.isFetching = true;
    this.companyService.addMocToCompany(value).subscribe((data: MocResponse) => {
      this.isFetching = false;
      if (data && data.success) {
        this.toaster.success("Moc added");
        this.dialogRef.close({ success: data.success });
      } else {
        this.toaster.error(data.message ? data.message : 'Server error')
      }
    });
  }

  update() {
    if(this.mocForm.invalid && this.companyId) {
      return;
    }
    console.log(this.mocForm.value);
    const value = this.mocForm.value;
    const companyId = this.companyId;
    const mocId = this.moc._id;
    Object.assign(value, {companyId});
    this.isFetching = true;
    this.companyService.editMocToCompany(mocId, value).subscribe((data: MocResponse) => {
      this.isFetching = false;
      if (data && data.success) {
        this.toaster.success("Moc updated");
        this.dialogRef.close({ success: data.success });
      } else {
        this.toaster.error(data.message ? data.message : 'Server error')
      }
    });
  }
}
