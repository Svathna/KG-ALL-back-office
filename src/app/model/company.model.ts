export interface CompanyDetail {
    name: string;
    nameInKhmer: string;
    _id: string;
    moc: Moc;
    dot: Dot;
    taxHistory: TaxHistory;
}

export interface CompanyResponse {
    name: string;
    nameInKhmer: string;
    _id: string;
    moc?: Moc;
    dot?: Dot;
    taxHistory?: TaxHistory;
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
    mocUsernamePasswordLogin: UsernamePasworrd;
    _id: string;
}

export enum CompanyType {
    SOLE_PROPRIETORSHIPS = 1,
    PRIVATE_LIMITED_COMPANY = 2,
    PUBLIC_LIMITED_COMPANY = 3,
}

export interface UsernamePasworrd {
    userName: string;
    password: string;
}

export interface Dot {
    dotNumber: number;
    notedDate: Date;
    dotBranch: string;
    address: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNumber: number;
    taxCardNumber: string;
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
