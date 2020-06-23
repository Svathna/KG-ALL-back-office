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

@Component({
  selector: "app-requests",
  templateUrl: "./requests.component.html",
  styleUrls: ["./requests.component.scss"],
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  isFetching = false;
  dialogRef: MatDialogRef<any>;

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.isFetching = true;
    this.companyService.getAllRequests().subscribe((data: RequestsResponse) => {
      this.isFetching = false;
      if (data && data.requests) {
        this.requests = data.requests;
        console.log(this.requests);
      }
    });
  }

  acceptRequest(event) {
    const { requestId, companyId } = event;
    if (!(requestId && companyId)) {
      return;
    }

    this.dialogRef = this.dialog.open(UploadDocModalComponent, {
      width: "800px",
      // height: "500px",
      data: { companyId }
    });

    // this.dialogRef.afterClosed().subscribe((data) => {
    //   if (data && data.success) {
    //     this.fetchCompanys();
    //   }
    // });

    // this.isFetching = true;
    // const status = RequestStatus.ACCEPTED;
    // this.companyService.changeRequestStutus(id, { status }).subscribe((data: RequestResponse)=> {
    //   if (data && data.success) {
    //     this.fetchRequests();
    //     this.toaster.success('Acept request success');
    //   } else {
    //     this.isFetching = false;
    //     this.toaster.error('Acept request failed');
    //   }
    // });
  }

  rejectRequest(id: string) {
    if (!id) {
      return;
    }
    this.isFetching = true;
    const status = RequestStatus.REJECTED;
    this.companyService
      .changeRequestStutus(id, { status })
      .subscribe((data: RequestResponse) => {
        if (data && data.success) {
          this.fetchRequests();
          this.toaster.success("Reject request success");
        } else {
          this.isFetching = false;
          this.toaster.error("Reject request failed");
        }
      });
  }
}
