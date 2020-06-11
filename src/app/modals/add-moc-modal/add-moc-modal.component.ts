import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-moc-modal',
  templateUrl: './add-moc-modal.component.html',
  styleUrls: ['./add-moc-modal.component.scss']
})
export class AddMocModalComponent implements OnInit {
  @Input() companyId: string; 

  mocForm: FormGroup;
  isFetching = false;
  passwordVisible = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private toaster: ToastrService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddMocModalComponent>,
  ) { }

  ngOnInit() {
    this.mocForm = this.formBuilder.group({
      mocNumber: new FormControl('', [Validators.required]),
      notedDate: new FormControl('', [Validators.required]),
      capital: new FormControl('', [Validators.required]),
      dateOfBTV: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      mocUsernameLogin: new FormControl('', [Validators.required]),
      mocPasswordLogin: new FormControl('', [Validators.required]),
    });
  }

  passwordEyeOffOnn() {
    this.passwordVisible = !this.passwordVisible;
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    console.log('yeh');
  }

}
