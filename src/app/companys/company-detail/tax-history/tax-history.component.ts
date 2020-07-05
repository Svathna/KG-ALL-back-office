import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTaxPerMonthModalComponent } from '../../../modals/add-tax-per-month-modal/add-tax-per-month-modal.component';
import { TaxPerMonth, TaxHistoryResponse } from '../../../interfaces/tax-per-month.interface';
import { TaxPerMonthsService } from '../../../service/tax-per-months.service';
import { TaxHistory } from '../../../model/company.model';
import { CompanyService } from '../../../service/company.service';

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
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.buildTaxPerMonths();
  }

  onRowClick(index: number) {
    if (this.taxPerMonths[index].revenue) {
      this.editTaxPerMonth(index);
    } else {
      this.addNewTaxPerMonth(index);
    }
  }

  addNewTaxPerMonth(index: number) {
    this.dialogRef = this.dialog.open(AddTaxPerMonthModalComponent, {
      width: '500px',
      data: {
        companyId: this.companyId,
        month: index + 1,
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.taxHistory) {
        this.taxHistory = data.taxHistory;
        this.buildTaxPerMonths();
      }
    });
  }

  editTaxPerMonth(index: number) {
    this.dialogRef = this.dialog.open(AddTaxPerMonthModalComponent, {
      width: '500px',
      data: {
        month: index + 1,
        taxPerMonth: this.taxPerMonths[index],
        taxHistoryId: this.taxHistory._id,
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.taxHistory) {
        this.taxHistory = data.taxHistory;
        this.buildTaxPerMonths();
      }
    });
  }

  async fetchTaxhistory() {
    if (!this.taxHistory) {
      return;
    } 
    this.isFetching = true;
    await this.companyService.getTaxHistory(this.taxHistory._id).subscribe((data: TaxHistoryResponse) => {
      this.isFetching = false;
      if (data && data.taxHistory) {
        this.taxHistory = data.taxHistory;
        this.buildTaxPerMonths();
      }
    });
  }

  async buildTaxPerMonths(){
    let taxPerMonths: TaxPerMonth[];
    if (!this.taxHistory.taxPerMonths) {
      taxPerMonths = [];
    }
    this.isFetching = true;
    const arrayData: TaxPerMonth[] = await this.taxPerMonthService.buildTaxPerMonths(taxPerMonths ? taxPerMonths : this.taxHistory.taxPerMonths);
    this.taxPerMonths = [...arrayData];
    this.isFetching = false;
  }
}
