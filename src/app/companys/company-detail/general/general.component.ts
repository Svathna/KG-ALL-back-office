import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
