import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() edit = new EventEmitter<CompanyDetail>();
  @Output() remove = new EventEmitter<CompanyDetail>();

  dialogRef: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  deleteCompany(event) {
    event.preventDefault();
    this.remove.emit(this.company);
  }

  editCompany(event) {
    event.preventDefault();
    this.edit.emit(this.company);
  }

}
