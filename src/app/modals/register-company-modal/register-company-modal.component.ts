import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CompanyService } from '../../service/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyResponse, CompanyDetail } from '../../model/company.model';
@Component({
  selector: 'app-register-company-modal',
  templateUrl: './register-company-modal.component.html',
  styleUrls: ['./register-company-modal.component.scss']
})
export class RegisterCompanyModalComponent implements OnInit {
  companyForm: FormGroup;
  passwordVisible = false;
  isFetching = false;
  company: CompanyDetail;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public dataCompany: any,
    public dialogRef: MatDialogRef<RegisterCompanyModalComponent>,
  ) {
    
  }

  ngOnInit() {
    console.log(this.company)
    if (this.dataCompany) {
      this.buildEditForm();
    } else {
      this.buildRegisterForm();
    }
  }

  buildRegisterForm() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      nameInKhmer: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9)]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  buildEditForm() {
    this.company = this.dataCompany.company;
    console.log(this.company);
    this.companyForm = this.formBuilder.group({
      name: new FormControl(this.company.name, [Validators.required]),
      nameInKhmer: new FormControl(this.company.nameInKhmer, [Validators.required]),
      fullName: new FormControl(this.company.user.fullName, [Validators.required]),
      phoneNumber: new FormControl(`0${this.company.user.phoneNumber}`, [Validators.required, Validators.minLength(9)]),
      userName: new FormControl(this.company.user.userName, [Validators.required]),
      password: new FormControl('', [Validators.minLength(8)])
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

  update() {
    if(this.companyForm.invalid) {
      return;
    }
    console.log(this.companyForm.value);
    this.isFetching = true;
  }



  passwordEyeOffOnn() {
    this.passwordVisible = !this.passwordVisible;
  }

}
