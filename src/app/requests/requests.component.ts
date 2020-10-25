import { Component, OnInit } from "@angular/core";
import { CompanyService } from "../service/company.service";
import {
  Request,
  RequestsResponse,
  RequestStatus,
  RequestResponse,
} from "../model/request.model";
import { ToastrService } from "ngx-toastr";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { UploadDocModalComponent } from "../modals/upload-doc-modal/upload-doc-modal.component";
import { RejectRequestConfirmModalComponent } from "../modals/reject-request-confirm-modal/reject-request-confirm-modal.component";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { CompanysResponse, CompanyDetail } from "../model/company.model";

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class RequestsComponent implements OnInit {
  requests: Request[] = [];
  requestsFiltered: Request[] = [];
  isFetching = false;
  dialogRef: MatDialogRef<any>;
  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  companys: CompanyDetail[] = [];

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {
    this.fetchRequests();
    this.fetchCompanys();
  }

  ngOnInit() {
    this.filterSearch();
  }

  filterSearch() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const filterValue = value.toLowerCase();

        // filter request
        if (this.requests.length > 0) {
          this.requestsFiltered = this.requests.filter((request) => {
            return request.company.name.toLowerCase().includes(filterValue) || request.company.nameInKhmer.toLowerCase().includes(filterValue);
          });
        }
        return this._filter(value);
      })
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  fetchRequests(loading: boolean = true, status: RequestStatus = RequestStatus.PENDING) {
    this.isFetching = loading;
    this.companyService.getAllRequests({ status }).subscribe((data: RequestsResponse) => {
      this.isFetching = false;
      if (data && data.requests) {
        this.requests = data.requests;
        this.requestsFiltered = this.requests;
      }
    });
  }

  onAcceptRequest(event) {
    const { requestId, companyId, docId } = event;
    if (!(requestId && companyId)) {
      return;
    }

    this.dialogRef = this.dialog.open(UploadDocModalComponent, {
      width: "800px",
      // height: "500px",
      data: { companyId, docId },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.acceptRequest(requestId);
      }
    });
  }

  acceptRequest(id: string) {
    this.isFetching = true;
    const status = RequestStatus.ACCEPTED;
    this.companyService
      .changeRequestStutus(id, { status })
      .subscribe((data: RequestResponse) => {
        if (data && data.success) {
          this.fetchRequests(false);
          this.toaster.success("Success");
        } else {
          this.isFetching = false;
          this.toaster.error("Failed");
        }
      });
  }

  rejectRequest(id: string) {
    if (!id) {
      return;
    }

    this.dialogRef = this.dialog.open(RejectRequestConfirmModalComponent, {
      data: { id },
    });

    this.dialogRef.afterClosed().subscribe((data) => {
      if (data && data.success) {
        this.fetchRequests();
      }
    });
  }

  fetchCompanys() {
    this.isFetching = true;
    this.companyService.getCompanys().subscribe((data: CompanysResponse) => {
      this.isFetching = false;
      if (data.success) {
        this.companys = data.companys;
        this.options = this.companys.map((company) => company.name);
        this.filterSearch();
      }
    });
  }

  filterRequestByStatus(status: RequestStatus) {
    this.fetchRequests(true, status);
  }
}
