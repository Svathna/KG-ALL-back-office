export enum UserType {
    ADMIN = 1,
    NORMAL_USER = 2,
}

export class User {
    userName: string;
    type: UserType;
    phoneNumber: number;
    registrationTokens: string[];
    deleted: boolean;
    _id: string;

    constructor(user) {
        this.userName = user.userName;
        this.type = user.type ? user.type : null;
        this.phoneNumber = user.phoneNumber;
        this.registrationTokens = user.registrationTokens;
        this.deleted = user.deleted;
        this._id = user._id;
    }
}
