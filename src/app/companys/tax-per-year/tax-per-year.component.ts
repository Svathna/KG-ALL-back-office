import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaxPerYear } from '../../interfaces/tax-per-year.interface';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddTaxPerYearModalComponent } from '../../modals/add-tax-per-year-modal/add-tax-per-year-modal.component';
import { TaxHistoryResponse } from '../../interfaces/tax-per-month.interface';

@Component({
  selector: 'tax-per-year',
  templateUrl: './tax-per-year.component.html',
  styleUrls: ['./tax-per-year.component.scss']
})
export class TaxPerYearComponent {
  @Input() companyId: string;
  @Input() taxHistoryId: string;
  @Input() taxPerYears: TaxPerYear[] = [];

  @Output() updated = new EventEmitter<any>();

  currentDate = new Date();
  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  onRowClick() {   
    this.addNewTaxPerYear();
  }

  addNewTaxPerYear() {
    this.dialogRef = this.dialog.open(AddTaxPerYearModalComponent, {
      width: '500px',
      data: {
        companyId: this.companyId,
        taxPerYears: this.taxPerYears,
      },
    });

    this.dialogRef.afterClosed().subscribe((data: TaxHistoryResponse) => {
      if (data && data.taxHistory) {
        this.updated.emit(data.taxHistory);
      }
    });
  }

}
