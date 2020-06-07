import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register-company-modal',
  templateUrl: './register-company-modal.component.html',
  styleUrls: ['./register-company-modal.component.scss']
})
export class RegisterCompanyModalComponent implements OnInit {
  companyForm: FormGroup;
  passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      nameInKhmer: new FormControl('', [Validators.required])
    });
  }

  save() {
    console.log('haha');
  }

  passwordEyeOffOnn() {
    this.passwordVisible = !this.passwordVisible;
  }

}
