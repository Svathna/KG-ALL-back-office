import { Component, OnInit, Inject } from '@angular/core';
import { CompanyService } from '../../service/company.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RequestStatus, RequestResponse } from '../../model/request.model';
import { mapMultiply } from 'chartist';

@Component({
  selector: 'app-reject-request-confirm-modal',
  templateUrl: './reject-request-confirm-modal.component.html',
  styleUrls: ['./reject-request-confirm-modal.component.scss']
})
export class RejectRequestConfirmModalComponent implements OnInit {
  isFetching = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RejectRequestConfirmModalComponent>,
    private companyService: CompanyService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  confirmRemove() {
    if (this.data && this.data.id) {
      this.isFetching = true;
      const id = this.data.id;
      const status = RequestStatus.REJECTED;
      this.companyService.changeRequestStutus(id, { status }).subscribe((data: RequestResponse) => {
        this.isFetching = false;
        if (data && data.success) {
          this.toaster.success("Reject success");
          this.dialogRef.close({ success: data.success });
        } else {
          this.toaster.error(data.message ? data.message : 'Server error');
        }
      });
    }
  }

  cancelRemove() {
    this.dialogRef.close();
  }
}
