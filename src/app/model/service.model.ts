import { MonthlyTaxService } from '../interfaces/monthly-tax-return.interface';
import { AnnualTaxService } from '../interfaces/annual-tax-return.interface';

export interface Service {
    _id: string
    monthlyTaxService: MonthlyTaxService;
    annualTaxService: AnnualTaxService;
    docUrl: string;
}
