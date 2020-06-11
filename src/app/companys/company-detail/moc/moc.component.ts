import { Component, OnInit, Input } from '@angular/core';
import { DocumentType, Moc } from '../../../model/company.model';

@Component({
  selector: 'app-moc',
  templateUrl: './moc.component.html',
  styleUrls: ['./moc.component.scss']
})
export class MocComponent implements OnInit {
  @Input() moc: Moc;

  constructor() { }

  ngOnInit() {
    console.log(this.moc);
  }
  
  addMoc() {
    console.log('Yoooo');
  }

}
