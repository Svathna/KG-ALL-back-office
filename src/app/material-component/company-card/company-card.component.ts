import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user.model';
import { CompanyDetail } from '../../model/company.model';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RegisterCompanyModalComponent } from '../../modals/register-company-modal/register-company-modal.component';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() user: User;
  @Input() company: CompanyDetail;

  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  deleteCompany(event) {
    event.preventDefault();
    console.log(event);
  }

  editCompany(event) {
    event.preventDefault();
    console.log(event);
    this.openDialogEditCompany();
  }

  openDialogEditCompany() {
    this.dialogRef = this.dialog.open(RegisterCompanyModalComponent, {
        width: '800px',
        height: '500px',
        data: { company: this.company }
    });

    this.dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      // if (data && data.success) {
      //   this.fetchCompanys();
      // }
    });
  }

}
