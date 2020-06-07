import { Component, OnInit } from '@angular/core';
import { Company, CompanyDetail, CompanysResponse } from '../model/company.model';
import { User, UserType } from '../model/user.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CompanysState } from '../store/reducers/company.reducer';
import * as CompanyAction from '../store/actions/company.action';
import { AppState } from '../store/app.state';
import { selectAllCompanys } from '../store/selectors/companys.selector';
import { CompanyService } from '../service/company.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterCompanyModalComponent } from '../modals/register-company-modal/register-company-modal.component';

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
  companys: CompanyDetail[] = [];
  isFetching = false;
  dialogRef: MatDialogRef<any>;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.fetchCompanys();
  }

  fetchCompanys() {
    this.isFetching = true;
    this.companyService.getCompanys().subscribe((data: CompanysResponse) => {
      this.isFetching = false;
      if (data.success) {
        this.companys = data.companys;
      }
    });
  }

  openDialog() {
    this.dialogRef = this.dialog.open(RegisterCompanyModalComponent, {
        width: '800px',
        height: '500px',
    });

    this.dialogRef.afterClosed().subscribe(data => {
      if (data && data.success) {
        this.fetchCompanys();
      }
    });
  }

}
