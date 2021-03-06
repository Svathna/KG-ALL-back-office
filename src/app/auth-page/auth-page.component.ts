import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  ngOnInit() {
  }
  public newUser = false;
  public loginForm: FormGroup;
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    //   if (this.authService.isLoggedIn) {
    //     this.router.navigate(['/dashboard']);
    //  }
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.SignIn(
      this.loginForm.value['userName'],
      this.loginForm.value['password'],
    );
  }
}
