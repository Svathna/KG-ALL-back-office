import { Component, OnInit } from '@angular/core';
import { Company, CompanyDetail } from '../model/company.model';
import { User, UserType } from '../model/user.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompanysState } from '../store/reducers/company.reducer';
import * as CompanyAction from '../store/actions/company.action';
import { AppState } from '../store/app.state';
import { selectAllCompanys } from '../store/selectors/companys.selector';

const COMPANY_DETAIL_TESTING: Company = {
  name: 'Computer Science Co,LTD',
  nameInKhmer: 'វិទ្យាសាស្រ្តកំព្យូទ័រ កូអិលធីឌី',
  _id: '0ajfjjsd099433',
};

const USER_TESTING: User = {
  fullName: 'SereyVathna',
  userName: 'sereyvathna',
  phoneNumber: 89034920,
  type: UserType.NORMAL_USER,
  _id: '09039nklklakBdk',
};

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.scss']
})
export class CompanysComponent implements OnInit {
  companyTesting = COMPANY_DETAIL_TESTING;
  userTesting = USER_TESTING;
  companys$: Observable<Company[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.store.dispatch(CompanyAction.getCompanys());
  }

  ngOnInit() {
    this.companys$ = this.store.select(selectAllCompanys)
    this.companys$.subscribe(c => console.log(c));
  }

}
