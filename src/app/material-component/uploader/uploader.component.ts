import { Component, OnInit, EventEmitter, Output, Input, OnChanges, ViewChild, OnDestroy} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { UploaderOptions, UploadFile, UploadInput, humanizeBytes, UploadOutput } from 'ngx-uploader';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit, OnDestroy {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  isLoading = false;
  private eventsSubscription: Subscription;
  
  @Input() allowedContentTypes: string[] = ['image/jpeg', 'image/png', 'image/gif'];
  @Input() multiple = false;
  @Input() clickEvent: Observable<void>;
  @Input() idInput: string;

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() hasCompleted: EventEmitter<any> = new EventEmitter<any>();

  event: UploadInput = {
    type: 'uploadAll',
    url: environment.cloudinaryURL,
    method: 'POST',
    data: {
      upload_preset: environment.cloudinaryPreset,
     }
  };

  constructor(
    private toastrService: ToastrService,
  ) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.eventsSubscription = this.clickEvent.subscribe(() => {
      this.inputClicking();
    });

    this.loading.next(false);
    this.options = {
      concurrency: 1,
      maxUploads: 3,
      allowedContentTypes: this.allowedContentTypes,
    };
  }

  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        this.startUpload();
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        const { file: { response, responseStatus }} = output;
        if (responseStatus === 200) {
          // The file is downloaded
          this.hasCompleted.next(response);
          // this.toastrService.success('File uploaded!');
        } else {
          this.toastrService.error('Error uploading!', 'Please try again later');
        }
        // reset file
        this.files = [];
        this.loading.next(false);
        break;
    }
  }

  startUpload(): void {
    // sanity check
    if (this.files.length < 1) {
      return;
    }
    this.isLoading = true;
    this.loading.next(true);
    this.uploadInput.emit(this.event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles() {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  inputClicking() {
    if (!this.idInput) {
      return;
    }
    document.getElementById(this.idInput).click();
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
