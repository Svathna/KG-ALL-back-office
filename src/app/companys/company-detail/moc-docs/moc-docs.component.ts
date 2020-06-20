import { Component, OnInit, Input } from '@angular/core';
import { CompanyDetail } from '../../../model/company.model';

@Component({
  selector: 'app-moc-docs',
  templateUrl: './moc-docs.component.html',
  styleUrls: ['./moc-docs.component.scss']
})
export class MocDocsComponent implements OnInit {
  @Input() company: CompanyDetail;

  constructor() { }

  ngOnInit() {
  }

}
