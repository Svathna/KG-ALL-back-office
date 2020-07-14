import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TaxPerYear } from '../../interfaces/tax-per-year.interface';
import { CompanyService } from '../../service/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { TaxHistoryResponse } from '../../interfaces/tax-per-month.interface';
import { TaxHistoryService, TaxPerYearsValue } from '../../service/tax-per-months.service';

@Component({
  selector: 'app-add-tax-per-year-modal',
  templateUrl: './add-tax-per-year-modal.component.html',
  styleUrls: ['./add-tax-per-year-modal.component.scss']
})
export class AddTaxPerYearModalComponent implements OnInit {
  currentDate = new Date();
  taxPerYearForm: FormGroup;
  taxPerYears: TaxPerYear[] = [];
  year: string;
  isFetching = false;
  isEdition = false;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddTaxPerYearModalComponent>,
    private toastr: ToastrService,
    private taxHistoryService: TaxHistoryService,
  ) { }

  ngOnInit() {
    if (this.data && this.data.taxPerYears) {
      this.taxPerYears = this.data.taxPerYears;
      this.buildNewForm();
    }
  }

  buildNewForm() {
    this.taxPerYearForm = this.formBuilder.group({
      taxPaidAmountLastYear: new FormControl([Validators.required]),
      taxPaidAmountLastTwoYear: new FormControl(),
      taxPaidAmountLastThreeYear: new FormControl(),
      taxPaidAmountLastFourYear: new FormControl(),
      taxPaidAmountLastFiveYear: new FormControl(),
    });
  }

  save() {
    if (this.taxPerYearForm.invalid) {
      return;
    }
    this.isFetching = true;
    this.buildBodyAndSubmit();
  }

  async buildBodyAndSubmit() {
    const { companyId } = this.data;

    if (!companyId) {
      return;
    }
    const value: TaxPerYearsValue = this.taxPerYearForm.value;

    const taxPerYears: TaxPerYear[] = await this.taxHistoryService.buildTaxPerYearsValue(value);
    const body = {
      taxPerYears,
    }
    this.companyService.addTaxPerYear(companyId, body).subscribe((data: TaxHistoryResponse) => {
      this.isFetching = false;
      if (data && data.taxHistory) {
        this.toastr.success('Success');
        this.dialogRef.close({ taxHistory: data.taxHistory });
      } else {
        this.toastr.error('Failed');
        this.dialogRef.close();
      }
    });
  }

}
