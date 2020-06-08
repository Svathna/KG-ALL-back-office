import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-remove-company-confirm-modal',
  templateUrl: './remove-company-confirm-modal.component.html',
  styleUrls: ['./remove-company-confirm-modal.component.scss']
})
export class RemoveCompanyConfirmModalComponent implements OnInit {
  isFetching = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RemoveCompanyConfirmModalComponent>,
    private companyService: CompanyService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
  }

  confirmRemove() {
    if (this.data && this.data.id) {
      const id = this.data.id;
      this.isFetching = true;
      this.companyService.removeCompany(id).subscribe((data: any) => {
        this.isFetching = false;
        if (data && data.success) {
          this.toaster.success("Company removed");
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
