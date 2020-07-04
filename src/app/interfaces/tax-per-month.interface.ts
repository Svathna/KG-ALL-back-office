import { TaxHistory } from "../model/company.model";

export interface TaxHistoryResponse {
    taxHistory: TaxHistory;
    success: boolean;
    message: string;
}

export class TaxPerMonth {
    year?: string;
    month: number;
    revenue?: number;
    spending?: number;
    taxPaidAmount?: number;
    others?: string;
}
