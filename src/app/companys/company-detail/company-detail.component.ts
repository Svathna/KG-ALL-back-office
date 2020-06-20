import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { CompanyDetail, CompanyResponse } from '../../model/company.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddMocModalComponent } from '../../modals/add-moc-modal/add-moc-modal.component';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  isFetching = false;
  id: string;
  company: CompanyDetail;
  dialogRef: MatDialogRef<any>;
  private routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private dialog: MatDialog,
  ) {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']? params['id'] : '';
    });
  }

  ngOnInit() {
    this.getCompanyDetail(true);
  }

  getCompanyDetail(loading: boolean = false) {
    this.isFetching = loading;
    this.companyService.getCompanyById(this.id).subscribe((data: CompanyResponse) => {
      this.isFetching = false;
      if (data && data.company) {
        this.company = data.company;
      }
    });
  }

  onAddMoc(event) {
    this.dialogRef = this.dialog.open(AddMocModalComponent, {
      width: "800px",
      // height: "500px",
      data: {
        companyId: this.company._id
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.getCompanyDetail();
      }
    });
  }

  onEditMoc(event) {
    this.dialogRef = this.dialog.open(AddMocModalComponent, {
      width: "800px",
      // height: "500px",
      data: {
        companyId: this.company._id,
        moc: this.company.MOC ? this.company.MOC : '',
      },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.getCompanyDetail();
      }
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
