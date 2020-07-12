import { Injectable } from '@angular/core';
import { TaxPerMonth } from '../interfaces/tax-per-month.interface';
import * as moment from 'moment';
import { TaxPerYear } from '../interfaces/tax-per-year.interface';

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

    for (let index = 0; index < 5; index++) {
      
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

}
