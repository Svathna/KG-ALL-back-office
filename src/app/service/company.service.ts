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
    return this.http.get(environment.apiURL + '/company');
  }

  getAllRequests() {
    return this.http.get(environment.apiURL + `/request`);
  }

  getCompanyById(id: string) {
    return this.http.get(environment.apiURL + `/company/${id}`);
  }

  registerCompany(body) {
    return this.http.post(environment.apiURL + `/company`, body);
  }

  updateCompany(body, companyId: string) {
    return this.http.patch(environment.apiURL + `/company/${companyId}`, body);
  }

  removeCompany(id: string) {
    return this.http.delete(environment.apiURL + `/company/${id}`);
  }

  addMocToCompany(body) {
    return this.http.post(environment.apiURL + `/moc`, body);
  }

  editMocToCompany(id: string, body) {
    return this.http.patch(environment.apiURL + `/moc/${id}`, body);
  }

  addDotToCompany(body) {
    return this.http.post(environment.apiURL + `/dot`, body);
  }

  editDotToCompany(id: string, body) {
    return this.http.patch(environment.apiURL + `/dot/${id}`, body);
  }

  addDocToCompany(body) {
    return this.http.post(environment.apiURL + `/doc`, body);
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
