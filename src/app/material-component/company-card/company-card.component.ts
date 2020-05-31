import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../model/user.model';
import { Company } from '../../model/company.model';

@Component({
  selector: 'company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss']
})
export class CompanyCardComponent implements OnInit {
  @Input() user: User;
  @Input() company: Company;

  constructor() { }

  ngOnInit() {
  }

}
