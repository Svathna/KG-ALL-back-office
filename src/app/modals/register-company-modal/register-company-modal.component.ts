import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompanyService } from '../../service/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyResponse } from '../../model/company.model';
@Component({
  selector: 'app-register-company-modal',
  templateUrl: './register-company-modal.component.html',
  styleUrls: ['./register-company-modal.component.scss']
})
export class RegisterCompanyModalComponent implements OnInit {
  companyForm: FormGroup;
  passwordVisible = false;
  isFetching = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RegisterCompanyModalComponent>,
  ) {
    
  }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      nameInKhmer: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  save() {
    console.log(this.companyForm.value)
    if(this.companyForm.invalid) {
      return;
    }
    this.isFetching = true;
    this.companyService.registerCompany(this.companyForm.value).subscribe((data: CompanyResponse) => {
      console.log(data);
      this.isFetching = false;
      if(data.success) {
        this.dialogRef.close({ success: data.success });
      }
    });
  }

  passwordEyeOffOnn() {
    this.passwordVisible = !this.passwordVisible;
  }

}
