import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { Request, RequestsResponse } from '../model/request.model';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  isFetching = false;

  constructor(
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.isFetching = true;
    this.companyService.getAllRequests().subscribe((data: RequestsResponse) => {
      this.isFetching = false;
      if (data && data.requests) {
        this.requests = data.requests;
        console.log(this.requests)
      }
    });
  }

  acceptRequest(event) {
    console.log(event);
  }

  rejectRequest(event) {
    console.log(event);
  }

}
