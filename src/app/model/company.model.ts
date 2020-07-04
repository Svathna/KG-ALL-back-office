import { User } from "./user.model";
import { TaxPerMonth } from "../interfaces/tax-per-month.interface";
import { TaxPerYear } from "../interfaces/tax-per-year.interface";

export enum DocType {
    MOC_CERTIFICATE = 'moc_certificate',
    BUSINESS_EXTRACT_FILE = 'business_extract',
    VAT_CERTIFICATE = 'vat_certificate',
    PATENT = 'patent',
    GDT_CARD = 'gdt_card',
    OTHERS = 'others',
}

export interface OtherDocument {
    docUrl: string;
    title: string;
    titleInKhmer: string;
}

export interface Doc {
    _id: string;
    moc_certificate: string;
    business_extract: string;
    vat_certificate: string;
    patent: string;
    gdt_card: string;
    others: OtherDocument[];
}

export interface CompanyDetail {
    name: string;
    nameInKhmer: string;
    _id: string;
    user?: User;
    MOC?: Moc;
    DOT?: Dot;
    docs: Doc,
    taxHistory: TaxHistory;
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

export interface MocResponse {
    moc: Moc;
    success: boolean;
    message: string;
}

export interface DocResponse {
    doc: Doc;
    success: boolean;
    message: string;
}

export interface DotResponse {
    dot: Dot;
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
    // dateOfBTV: Date;
    annualTranscriptMaintenanceDate: Date;
    companyType: CompanyType;
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
    dotNumber: string;
    notedDate: Date;
    notedAtBranch: string;
    address: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: number;
    taxationCardNumber: string;
    phoneNumber: number;
    _id: string;
}

export interface TaxHistory {
    taxPerMonths?: TaxPerMonth[];
    taxPerYears?: TaxPerYear[];
    _id: string;
}
