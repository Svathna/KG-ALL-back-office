export enum UserType {
    ADMIN = 1,
    NORMAL_USER = 2,
}

export interface User {
    userName: string;
    type: UserType;
    phoneNumber: number;
    registrationTokens: string[];
    deleted: boolean;
    _id: string;
}
