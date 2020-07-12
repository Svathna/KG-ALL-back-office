import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tax-per-year',
  templateUrl: './tax-per-year.component.html',
  styleUrls: ['./tax-per-year.component.scss']
})
export class TaxPerYearComponent implements OnInit {

  currentDate = new Date();

  constructor() { }

  ngOnInit() {
  }

}
