import { Component, Input } from '@angular/core';
import { CompanyDetail } from '../../../model/company.model';

@Component({
  selector: 'app-dot-docs',
  templateUrl: './dot-docs.component.html',
  styleUrls: ['./dot-docs.component.scss']
})
export class DotDocsComponent {
  @Input() company: CompanyDetail;
  
  constructor() { }
}
