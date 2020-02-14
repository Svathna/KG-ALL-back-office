import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SecureInnerPagesGuardGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn) {
      this.toaster.info("You are not allowed to access this URL!");
      this.router.navigate(['admin'])
    } else 
    return true;
  }

}
