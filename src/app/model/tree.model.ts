import { User } from "./user.model";

export interface GeoLocation {
    lat: string;
    long: string;
  }

export class Tree {
    name: string;
    description: string;
    photo: string;
    location: GeoLocation;
    deleted: boolean;
    owner: User[]
    _id: string;

    constructor(tree) {
        this.name = tree.name;
        this.description = tree.description;
        this.photo = tree.photo;
        this.deleted = tree.deleted;
        this._id = tree._id;
        this.owner = tree.owner;
        this.deleted = tree.deleted;
    }
}
