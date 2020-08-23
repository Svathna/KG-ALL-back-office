import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  docUrl: string;
  isUploading = false;
  isFetching = false;

  constructor() { }

  ngOnInit() {
  }

  uploadedCompleted(response) {
    this.docUrl = response.secure_url;
    // this.docForm.controls['docUrl'].setValue(this.docUrl);
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
    console.log(this.isUploading);
  }

  loadToPdfViewerCompleted() {
    this.isUploading = false;
  }

}
