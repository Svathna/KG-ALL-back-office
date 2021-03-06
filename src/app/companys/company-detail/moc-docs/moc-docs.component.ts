import { Component, Input } from '@angular/core';
import { CompanyDetail } from '../../../model/company.model';

@Component({
  selector: 'app-moc-docs',
  templateUrl: './moc-docs.component.html',
  styleUrls: ['./moc-docs.component.scss']
})
export class MocDocsComponent {
  @Input() company: CompanyDetail;

  constructor() { }

}
