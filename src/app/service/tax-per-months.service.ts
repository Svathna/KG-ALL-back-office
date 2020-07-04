import { Injectable } from '@angular/core';
import { TaxPerMonth } from '../interfaces/tax-per-month.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaxPerMonthsService {
  currentDate = new Date();

  constructor() { }

  async buildTaxPerMonths(arrayData: TaxPerMonth[]) {
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
}
