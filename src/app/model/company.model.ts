import { User } from "./user.model";

export enum DocumentType {
    MOC_CERTIFICATE = 'moc_certificate',
    BUSINESS_EXTRACT_FILE = 'business_extract',
    VAT_CERTIFICATE = 'vat_certificate',
    PATENT = 'patent',
    GDT_CARD = 'gdt_card',
    OTHERS = 'others',
}
export interface CompanyDetail {
    name: string;
    nameInKhmer: string;
    _id: string;
    user?: User;
    moc?: Moc;
    dot?: Dot;
    taxHistory?: TaxHistory;
}

export interface CompanysResponse {
    companys: CompanyDetail[];
    success: boolean;
    message: string;
}

export interface CompanyResponse {
    company: CompanyDetail;
    success: boolean;
    message: string;
}

export interface Company {
    name: string;
    nameInKhmer: string;
    _id: string;
}

export interface Moc {
    mocNumber: number;
    notedDate: Date;
    capital: number;
    dateOfBTV: Date;
    type: CompanyType;
    mocUsernameLogin: string;
    mocPasswordLogin: string;
    _id: string;
}

export enum CompanyType {
    SOLE_PROPRIETORSHIPS = 1,
    PRIVATE_LIMITED_COMPANY = 2,
    PUBLIC_LIMITED_COMPANY = 3,
}

// export interface UsernamePasworrd {
//     userName: string;
//     password: string;
// }

export interface Dot {
    dotNumber: number;
    notedDate: Date;
    dotBranch: string;
    address: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: number;
    taxationCardNumber: string;
    phoneNumber: string;
    _id: string;
}

export interface TaxHistory {
    revenue: number;
    spending: number;
    paidAmout: number;
    others: string;
    month: string;
    year: number;
    _id: string;
}
