import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface UserResponse {
  user: User;
  success: boolean;
  message: string;
}

export interface UsersResponse {
  users: User[];
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public user: User;
  public users: User[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAllUsers() {
    console.log('hey');
    return this.http.get(environment.apiURL + '/user');
  }

  getAllTrees() {
    console.log('hey');
    return this.http.get(environment.apiURL + '/tree');
  }
}