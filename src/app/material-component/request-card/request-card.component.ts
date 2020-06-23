import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Request } from "../../model/request.model";

@Component({
  selector: "request-card",
  templateUrl: "./request-card.component.html",
  styleUrls: ["./request-card.component.scss"],
})
export class RequestCardComponent implements OnInit {
  @Input() request: Request;

  @Output() accept = new EventEmitter<string>();
  @Output() reject = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  acceptRequest(event) {
    event.preventDefault();
    event.stopPropagation();
    this.accept.emit(this.request._id);
  }

  rejectRequest(event) {
    event.preventDefault();
    event.stopPropagation();
    this.reject.emit(this.request._id);
  }
}
