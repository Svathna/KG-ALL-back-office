import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DocType, Moc, CompanyDetail } from '../../../model/company.model';

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent implements OnInit {
  @Input() moc: Moc;

  @Output() addMoc = new EventEmitter<CompanyDetail>();

  constructor() { }

  ngOnInit() {
    console.log(this.moc);
  }

  onAddMoc(event) {
    this.addMoc.emit(event);
  }

}
