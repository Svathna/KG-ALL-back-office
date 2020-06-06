import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private http: HttpClient,
  ) { }
  
  getCompanys() {
    console.log('yahh');
    return this.http.get(environment.apiURL + '/company');
  }

  getCompanyById(id: string) {
    return this.http.get(environment.apiURL + `/company/${id}`);
  }

//   openLoginModal() {
//     this.loginModal = this.openModal(LoginComponent);
// }

//   openModal(portalComponent) {
//     const modal = this.matDialog.open(AuthModalComponent, {
//         width: '1000px',
//     });

//     return modal;
//   }

}
