import { Component, OnInit, Input } from '@angular/core';
import { TaxPerYear } from '../../interfaces/tax-per-year.interface';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'tax-per-year',
  templateUrl: './tax-per-year.component.html',
  styleUrls: ['./tax-per-year.component.scss']
})
export class TaxPerYearComponent implements OnInit {
  @Input() companyId: string;
  @Input() taxHistoryId: string;
  @Input() taxPerYears: TaxPerYear[] = [];

  currentDate = new Date();
  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() { }

  onRowClick(index: number) {
    console.log(index);
  }

}
