import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user.model';
import { CompanyDetail } from '../../model/company.model';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() user: User;
  @Input() company: CompanyDetail;

  constructor() { }

  ngOnInit() {
  }

}
