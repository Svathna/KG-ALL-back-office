import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTaxPerMonthModalComponent } from '../../../modals/add-tax-per-month-modal/add-tax-per-month-modal.component';
import { TaxPerMonth } from '../../../interfaces/tax-per-month.interface';
import { TaxPerMonthsService } from '../../../service/tax-per-months.service';
import { TaxHistory } from '../../../model/company.model';

export const MONTHS = [
  'មករា',
  'កុម្ភៈ',
  'មីនា',
  'មេសា',
  'ឧសភា',
  'មិថុនា',
  'កក្កដា',
  'សីហា',
  'កញ្ញា',
  'តុលា',
  'វិច្ឆិកា',
  'ធ្នូ',
];

@Component({
  selector: 'app-tax-history',
  templateUrl: './tax-history.component.html',
  styleUrls: ['./tax-history.component.scss']
})
export class TaxHistoryComponent implements OnInit {
  @Input() companyId: string;
  @Input() taxHistory: TaxHistory; 

  currentDate = new Date();
  monthArray = MONTHS;
  dialogRef: MatDialogRef<any>;
  isFetching = false;
  taxPerMonths: TaxPerMonth[] = [];

  constructor(
    private dialog: MatDialog,
    private taxPerMonthService: TaxPerMonthsService,
  ) { }

  ngOnInit() {
    this.buildTaxPerMonths();
  }

  addTax(index: number) {
    this.dialogRef = this.dialog.open(AddTaxPerMonthModalComponent, {
      width: '500px',
      data: {
        companyId: this.companyId,
        month: index + 1,
      },
    });
  }

  async buildTaxPerMonths(){
    if (!this.taxHistory.taxPerMonths) {
      return;
    }
    console.log(this.taxPerMonths);
    this.isFetching = true;
    const arrayData: TaxPerMonth[] = await this.taxPerMonthService.buildTaxPerMonths(this.taxHistory.taxPerMonths);
    this.taxPerMonths = [...arrayData];
    this.isFetching = false;
    console.log(this.taxPerMonths);
  }
}
