import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MONTHS } from '../tax-history.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TaxPerMonth, TaxHistoryResponse } from '../../../../interfaces/tax-per-month.interface';
import { AddTaxPerMonthModalComponent } from '../../../../modals/add-tax-per-month-modal/add-tax-per-month-modal.component';

@Component({
  selector: 'tax-per-month',
  templateUrl: './tax-per-month.component.html',
  styleUrls: ['./tax-per-month.component.scss']
})
export class TaxPerMonthComponent {

  @Input() companyId: string;
  @Input() taxHistoryId: string;
  @Input() taxPerMonths: TaxPerMonth[] = [];

  @Output() updated = new EventEmitter<any>();

  monthArray = MONTHS;
  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) { }

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

    this.dialogRef.afterClosed().subscribe((data: TaxHistoryResponse) => {
      if (data && data.taxHistory) {
        this.updated.emit(data.taxHistory);
      }
    });
  }

  editTaxPerMonth(index: number) {
    this.dialogRef = this.dialog.open(AddTaxPerMonthModalComponent, {
      width: '500px',
      data: {
        month: index + 1,
        taxPerMonth: this.taxPerMonths[index],
        taxHistoryId: this.taxHistoryId,
      },
    });

    this.dialogRef.afterClosed().subscribe((data: TaxHistoryResponse) => {
      if (data && data.taxHistory) {
        this.updated.emit(data.taxHistory);
      }
    });
  }
}
