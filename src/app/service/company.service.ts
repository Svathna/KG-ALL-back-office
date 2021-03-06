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

  getAllRequests(body) {
    return this.http.post(environment.apiURL + `/request/alls`, body);
  }

  changeRequestStutus(id: string, body) {
    return this.http.patch(environment.apiURL + `/request/${id}`, body);
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

  addTaxPerMonth(id: string, body) {
    return this.http.post(environment.apiURL + `/tax/taxPerMonth/${id}`, body);
  }

  updateTaxPerMonth(id: string, body) {
    return this.http.patch(environment.apiURL + `/tax/taxPerMonth/${id}`, body);
  }

  getTaxHistory(id: string) {
    return this.http.get(environment.apiURL + `/tax/${id}`);
  }

  addTaxPerYear(id: string, body) {
    return this.http.post(environment.apiURL + `/tax/taxPerYear/${id}`, body);
  }

  removeTaxPerMonth(id: string, body) {
    return this.http.patch(environment.apiURL + `/tax/taxPerMonth/remove/${id}`, body);
  }

  // service
  createService(body) {
    return this.http.post(environment.apiURL + `/service`, body);
  }

  getService() {
    return this.http.get(environment.apiURL + `/service`);
  }

  updateService(serviceId, body) {
    return this.http.patch(environment.apiURL + `/service/${serviceId}`, body);
  }

}
