import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MONTHS } from '../tax-history.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { TaxPerMonth, TaxHistoryResponse } from '../../../../interfaces/tax-per-month.interface';
import { AddTaxPerMonthModalComponent } from '../../../../modals/add-tax-per-month-modal/add-tax-per-month-modal.component';
import { RemoveCompanyConfirmModalComponent } from '../../../../modals/remove-company-confirm-modal/remove-company-confirm-modal.component';
import { CompanyService } from '../../../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

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
  @Output() removed = new EventEmitter<any>();

  monthArray = MONTHS;
  dialogRef: MatDialogRef<any>;
  currentMonth = parseInt(moment(new Date()).format('M'));

  constructor(
    private dialog: MatDialog,
    private companyService: CompanyService,
    private toastr: ToastrService,
  ) { }

  onRowClick(index: number) {
    // sanity check
    if (this.currentMonth < index + 1) {
      return;
    }

    if (this.taxPerMonths[index].revenue) {
      this.editTaxPerMonth(index);
    } else {
      this.addNewTaxPerMonth(index);
    }
  }

  addNewRow(index: number) {
    if (!index) {
      return;
    }
    this.onRowClick(index);
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

  removeTax(index: number) {
    this.dialogRef = this.dialog.open(RemoveCompanyConfirmModalComponent, {
      width: '500px',
      height: '150px',
      data: {
        content: 'This will removed from the list.'
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.removed.emit(index);
      }
    });
  }
}
