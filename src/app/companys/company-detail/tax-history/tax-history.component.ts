import { Component, OnInit, Input } from '@angular/core';
import { TaxPerMonth, TaxHistoryResponse } from '../../../interfaces/tax-per-month.interface';
import { TaxHistoryService } from '../../../service/tax-per-months.service';
import { TaxHistory } from '../../../model/company.model';
import { CompanyService } from '../../../service/company.service';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import { TaxPerYear } from '../../../interfaces/tax-per-year.interface';
import { ToastrService } from 'ngx-toastr';

export const MONTHS_IN_KHMERS = [
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

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'app-tax-history',
  templateUrl: './tax-history.component.html',
  styleUrls: ['./tax-history.component.scss']
})
export class TaxHistoryComponent implements OnInit {
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementIdOrContent: 'tax_per_month_table', // the id of html/table element
    // options: { // html-docx-js document options
    //   orientation: 'potrait',
    //   margins:{
    //     top:'10px',
    //     bottom:'10px'
    //   },
    // }
  }

  @Input() companyId: string;
  @Input() taxHistory: TaxHistory; 

  currentDate = new Date();
  monthArray = MONTHS;
  isFetching = false;
  taxPerMonths: TaxPerMonth[] = [];
  taxPerYears: TaxPerYear[] = [];

  constructor(
    private taxHistoryService: TaxHistoryService,
    private companyService: CompanyService,
    private exportAsService: ExportAsService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.buildTaxPerMonths();
    this.buildTaxPerYears();
  }

  exportPdf() {
    // download the file using old school javascript method
    this.exportAsService.save(this.exportAsConfig, 'My File Name').subscribe((data) => {
      // save started
    });
    // get the data as base64 or json object for json type - this will be helpful in ionic or SSR
    // this.exportAsService.get(this.exportAsConfig).subscribe(content => {
    //   console.log(content);
    // });
  }

  onTaxPerMonthUpdated(taxHistory: TaxHistory) {
    this.taxHistory = taxHistory;
    this.fetchTaxhistory();
  }

  onTaxPerMonthRemoved(index: number) {
    console.log(index);
    this.isFetching = true;
    const value = { month: index + 1 };
    this.companyService.removeTaxPerMonth(this.taxHistory._id, value).subscribe((data: any) => {
      this.isFetching = false;
      if (data && data.success) {
        this.fetchTaxhistory();
        this.toastr.success('Removed success');
      } else {
        this.toastr.error('Failed!');
      }
    })
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
        this.buildTaxPerYears();
      }
    });
  }

  async buildTaxPerMonths() {
    let taxPerMonths: TaxPerMonth[];
    if (!this.taxHistory.taxPerMonths) {
      taxPerMonths = [];
    }
    const arrayData: TaxPerMonth[] = await this.taxHistoryService.buildTaxPerMonths(taxPerMonths ? taxPerMonths : this.taxHistory.taxPerMonths);
    this.taxPerMonths = [...arrayData];
  }

  async buildTaxPerYears() {
    let taxPerYears: TaxPerYear[];
    if (!this.taxHistory.taxPerYears) {
      taxPerYears = [];
    }
    this.taxPerYears = await this.taxHistoryService.builTaxPerYears(taxPerYears ? taxPerYears : this.taxHistory.taxPerYears);
  }
}
