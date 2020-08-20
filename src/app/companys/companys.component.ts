import { Component, OnInit } from "@angular/core";
import {
  Company,
  CompanyDetail,
  CompanysResponse,
} from "../model/company.model";
import { User, UserType } from "../model/user.model";
import * as CompanyAction from "../store/actions/company.action";
import { CompanyService } from "../service/company.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { RegisterCompanyModalComponent } from "../modals/register-company-modal/register-company-modal.component";
import { RemoveCompanyConfirmModalComponent } from "../modals/remove-company-confirm-modal/remove-company-confirm-modal.component";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

const COMPANY_DETAIL_TESTING: Company = {
  name: "Computer Science Co,LTD",
  nameInKhmer: "វិទ្យាសាស្រ្តកំព្យូទ័រ កូអិលធីឌី",
  _id: "0ajfjjsd099433",
};

const USER_TESTING: User = {
  fullName: "SereyVathna",
  userName: "sereyvathna",
  phoneNumber: 89034920,
  type: UserType.NORMAL_USER,
  _id: "09039nklklakBdk",
};

@Component({
  selector: "app-companys",
  templateUrl: "./companys.component.html",
  styleUrls: ["./companys.component.scss"],
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
    private router: Router,
    private toaster: ToastrService,
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

  registerCompany() {
    this.dialogRef = this.dialog.open(RegisterCompanyModalComponent, {
      width: "800px",
      height: "500px",
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.fetchCompanys();
      }
    });
  }

  editCompany(company: CompanyDetail) {
    this.dialogRef = this.dialog.open(RegisterCompanyModalComponent, {
      width: "800px",
      height: "500px",
      data: { company },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.fetchCompanys();
      }
    });
  }

  removeCompany(company: CompanyDetail) {
    this.dialogRef = this.dialog.open(RemoveCompanyConfirmModalComponent, {
      width: '500px',
      height: '150px',
      data: {
        content: 'This will removed the company from the list.'
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.isFetching = true;
        this.companyService.removeCompany(company._id).subscribe((data: any) => {
              this.isFetching = false;
              if (data && data.success) {
                this.fetchCompanys();
                this.toaster.success("Company removed");
                this.dialogRef.close({ success: data.success });
              } else {
                this.toaster.error(data.message ? data.message : 'Server error');
              }
            });
      }
    });
  }

  goToCompanyDetail(id: string) {
    this.router.navigate([`company-detail/${id}`]);
  }
}
