import { Injectable } from '@angular/core';
import { User, UserType } from '../model/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface LoginResponse {
  token: string;
  user: User;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;
  public showLoader: boolean = false;

  constructor(
    public router: Router,
    private http: HttpClient,
    public toster: ToastrService,
  ) { }

  ngOnInit(): void { }

  // Sign in function
  SignIn(email, password) {
    return new Promise((resolve, reject) => {
      try {
        this.http.post(environment.apiURL + '/user/login', {
          email,
          password,
        })
        .subscribe(( response: LoginResponse) => {
          const { token, user } = response;
          if (user && response.success) {
            if (user.type === UserType.ADMIN || user.type === UserType.NORMAL_USER) {
              // OH YEAH! logged in successfuly
              this.toster.success('Login succesful');
              this.userData = new User(user);
              localStorage.setItem('user', JSON.stringify(this.userData));
              localStorage.setItem('token', token);
              this.router.navigate(['admin']);
              // got to the main page
              resolve(true);
            } else {
              localStorage.setItem('user', null);
              localStorage.setItem('token', null);
              this.toster.error('No Permission To Acess');
              reject('No Permission To Acess');
            }
          } else {
            localStorage.setItem('user', null);
            localStorage.setItem('token', null);
            this.toster.error('No user found');
            reject('No user found');
          }
        }, (res) => {
          const errorMessage = res.error.message;
          this.toster.error(errorMessage);
          reject('Error, logging in');
        });
      } catch (err) {
        this.toster.error(err);
        reject(err);
      }
    });
  }

  // Sign out
  SignOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate([``]).then(() => {
    });
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return (token != null) ? true : false;
  }
}
