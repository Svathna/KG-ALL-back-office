import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { CompanyDetail, CompanyResponse } from '../../model/company.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  isFetching = false;
  id: string;
  company: CompanyDetail;
  private routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']? params['id'] : '';
    });
  }

  ngOnInit() {
    this.getCompanyDetail()
  }

  getCompanyDetail() {
    this.isFetching = true;
    this.companyService.getCompanyById(this.id).subscribe((data: CompanyResponse) => {
      this.isFetching = false;
      if (data && data.companys) {
        this.company = data.companys;
        console.log(this.company);
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
