import { Injectable } from '@angular/core';
import { TaxPerMonth } from '../interfaces/tax-per-month.interface';
import * as moment from 'moment';
import { TaxPerYear } from '../interfaces/tax-per-year.interface';

export interface TaxPerYearsValue {
  taxPaidAmountLastYear: number,
  taxPaidAmountLastTwoYear?: number,
  taxPaidAmountLastThreeYear?: number,
  taxPaidAmountLastFourYear?: number,
  taxPaidAmountLastFiveYear?: number,
}

@Injectable({
  providedIn: 'root'
})
export class TaxHistoryService {
  currentDate = new Date();

  constructor() { }

  buildTaxPerMonths(arrayData: TaxPerMonth[]) {
    const currentYear = moment(this.currentDate).format('YYYY');

    let taxPerMonths: TaxPerMonth[] = [];
    for (let index = 0; index < 12; index++) {
      
      const existingData = arrayData.filter((data: TaxPerMonth) => {
        return data.month === (index + 1) && data.year === currentYear;
      });

      if (existingData.length > 0) {
        taxPerMonths.push(existingData[0]);
        continue;
      }

      let month = index + 1;

      const emptyTaxPerMonth: TaxPerMonth = {
        month,
      };

      taxPerMonths.push(emptyTaxPerMonth)
    }

    return taxPerMonths;
  }

  builTaxPerYears(arrayData: TaxPerYear[]) {
    const currentYear = parseInt(moment(this.currentDate).format('YYYY'));

    let taxPerYears: TaxPerYear[] = [];

    for (let index = 1; index < 6; index++) {
      
      const existingData = arrayData.filter((data: TaxPerYear) => {
        return data.year === (currentYear - index).toString();
      });
      
      if (existingData.length > 0) {
        taxPerYears.push(existingData[0]);
        continue;
      }

      const emptyTaxPerYear: TaxPerYear = {
        year: (currentYear - index).toString(),
      }

      taxPerYears.push(emptyTaxPerYear);
    }
    
    return taxPerYears;
  }

  buildTaxPerYearsValue(taxPerYearsValue: TaxPerYearsValue) {
    const currentYear = parseInt(moment(this.currentDate).format('YYYY'));
    let taxPerYears: TaxPerYear[] = [];

    if (!taxPerYearsValue.taxPaidAmountLastYear) {
      return taxPerYears;
    }

    if (taxPerYearsValue.taxPaidAmountLastYear) {
      taxPerYears.push({
        year: (currentYear - 1).toString(),
        taxPaidAmount: taxPerYearsValue.taxPaidAmountLastYear,
      });
    } 

    if (taxPerYearsValue.taxPaidAmountLastTwoYear) {
      taxPerYears.push({
        year: (currentYear - 2).toString(),
        taxPaidAmount: taxPerYearsValue.taxPaidAmountLastTwoYear,
      });
    }

    if (taxPerYearsValue.taxPaidAmountLastThreeYear) {
      taxPerYears.push({
        year: (currentYear - 3).toString(),
        taxPaidAmount: taxPerYearsValue.taxPaidAmountLastThreeYear,
      });
    }

    if (taxPerYearsValue.taxPaidAmountLastFourYear) {
      taxPerYears.push({
        year: (currentYear - 4).toString(),
        taxPaidAmount: taxPerYearsValue.taxPaidAmountLastFourYear,
      });
    }

    if (taxPerYearsValue.taxPaidAmountLastFiveYear) {
      taxPerYears.push({
        year: (currentYear - 5).toString(),
        taxPaidAmount: taxPerYearsValue.taxPaidAmountLastFiveYear,
      });
    }
    // return back
    return taxPerYears;
  }
}
