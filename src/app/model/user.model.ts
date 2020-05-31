export enum UserType {
    ADMIN = 1,
    NORMAL_USER = 2,
}

export interface User {
    fullName: string;
    userName: string;
    type: UserType;
    phoneNumber: number;
    registrationTokens?: string[];
    _id: string;
}
