import { Component, OnInit } from '@angular/core';
import { CompanyDetail } from '../model/company.model';
import { User, UserType } from '../model/user.model';

const COMPANY_DETAIL_TESTING: CompanyDetail = {
  name: 'Computer Science Co,LTD',
  nameInKhmer: 'វិទ្យាសាស្រ្តកំព្យូទ័រ កូអិលធីឌី',
  description: 'testing',
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

  constructor() { }

  ngOnInit() {
  }

}
