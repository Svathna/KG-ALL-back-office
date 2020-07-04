import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaxHistoryResponse } from '../../interfaces/tax-per-month.interface';
import { ToastrService } from 'ngx-toastr';
import { MONTHS } from '../../companys/company-detail/tax-history/tax-history.component';

@Component({
  selector: 'app-add-tax-per-month-modal',
  templateUrl: './add-tax-per-month-modal.component.html',
  styleUrls: ['./add-tax-per-month-modal.component.scss']
})
export class AddTaxPerMonthModalComponent implements OnInit {
  currentYear = new Date();
  month: number;
  taxPerMonthForm: FormGroup;
  isFetching = false;
  monthArray = MONTHS;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTaxPerMonthModalComponent>,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (this.data && this.data.month) {
      this.month = this.data.month;
    }
    this.buildNewForm();
  }

  buildNewForm() {
    this.taxPerMonthForm = this.formBuilder.group({
      year: new FormControl(moment(this.currentYear).format('YYYY')),
      month: new FormControl(this.month),
      revenue: new FormControl('', [Validators.required]),
      spending: new FormControl('', [Validators.required]),
      taxPaidAmount: new FormControl('', [Validators.required]),
      others: new FormControl('',),
    });
  }

  save() {
    const { companyId } = this.data;
    if (this.taxPerMonthForm.invalid) {
      return;
    }
    this.isFetching = true;
    const value = this.taxPerMonthForm.value;
    console.log(value);
    this.companyService.addTaxHistory(companyId, value).subscribe((data: TaxHistoryResponse) => {
      this.isFetching = false;
      if (data && data.taxHistory) {
        console.log(data.taxHistory);
        this.toastr.success('Success');
        this.dialogRef.close({ taxHistory: data.taxHistory });
      } else {
        this.toastr.error('Failed');
        this.dialogRef.close();
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
