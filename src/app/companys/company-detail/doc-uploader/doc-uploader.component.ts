import { Component, OnInit, Input } from "@angular/core";
import { CompanyDetail, DocResponse } from "../../../model/company.model";
import { Subject } from "rxjs";
import { CompanyService } from "../../../service/company.service";
import { ToastrService } from "ngx-toastr";

declare var require: any;
const FileSaver = require("file-saver");

@Component({
  selector: "doc-uploader",
  templateUrl: "./doc-uploader.component.html",
  styleUrls: ["./doc-uploader.component.scss"],
})
export class DocUploaderComponent implements OnInit {
  @Input() isMocCertificate: boolean = false;
  @Input() isBusinessExtract: boolean = false;
  @Input() isVatCertificate: boolean = false;
  @Input() isPatent: boolean = false;
  @Input() isGdtCard: boolean = false;
  @Input() company: CompanyDetail;
  @Input() docNo?: number = 0;

  isUploading = false;
  docUrl = '';
  docName = '';
  title = '';
  clickEventSubject: Subject<void> = new Subject<void>();

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService
  ) {}

  ngOnInit() {
    switch (true) {
      case this.isMocCertificate:
        this.title = "វិញ្ញាបនប័ត្រចុះបញ្ជីពាណិជ្ជកម្ម/MOC Certificate";
        this.docName = "moc_certificate";
        if (this.company.docs) {
          this.docUrl = this.company.docs.moc_certificate? this.company.docs.moc_certificate: "";
        }
        break;
      case this.isBusinessExtract:
        this.title = "សម្រង់ក្រុមហ៊ុន/Business Extract File";
        this.docName = "business_extract";
        if (this.company.docs) {
          this.docUrl = this.company.docs.business_extract? this.company.docs.business_extract: "";
        }
        break;
      case this.isVatCertificate:
        this.title = "វិញ្ញាបនប័ត្រចុះបញ្ជីពន្ធដារ/VAT certificate";
        this.docName = "vat_certificate";
        if (this.company.docs) {
          this.docUrl = this.company.docs.vat_certificate? this.company.docs.vat_certificate: "";
        }
        break;
      case this.isPatent:
        this.title = "ប័ណ្ណប៉ាតង់/Patent";
        this.docName = "patent";
        if (this.company.docs) {
          this.docUrl = this.company.docs.patent? this.company.docs.patent: "";
        }
        break;
      case this.isGdtCard:
        this.title = "កាតពន្ធដារ/GDT card";
        this.docName = "gdt_card";
        if (this.company.docs) {
          this.docUrl = this.company.docs.gdt_card? this.company.docs.gdt_card: "";
        }
        break;
      default:
        break;
    }
  }

  uploadedCompleted(response) {
    const url = response.secure_url;
    this.uploadToCompany(url);
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
  }

  download() {
    if (!this.docUrl) {
      return;
    }
    FileSaver.saveAs(this.docUrl, this.docName);
  }

  initialBody(url: string) {
    const value = {
      companyId: this.company ? this.company._id : "",
      docId: this.company.docs ? this.company.docs._id : "",
    };
    switch (true) {
      case this.isMocCertificate:
        const moc_certificate = url;
        Object.assign(value, {moc_certificate});
        return value;
      case this.isBusinessExtract:
        const business_extract = url;
        Object.assign(value, {business_extract});
        return value;
      case this.isVatCertificate:
        const vat_certificate = url;
        Object.assign(value, {vat_certificate});
        return value;
      case this.isPatent:
        const patent = url;
        Object.assign(value, {patent});
        return value;
      case this.isGdtCard:
        const gdt_card = url;
        Object.assign(value, {gdt_card});
        return value;
      default:
        break;
    }
  }

  uploadToCompany(url) {
    if (!this.company || !url) {
      return;
    }
    // const value = {
    //   moc_certificate: url,
    //   companyId: this.company ? this.company._id : "",
    //   docId: this.company.docs ? this.company.docs._id : "",
    // };
    const value = this.initialBody(url);
    this.isUploading = true;
    this.companyService
      .addDocToCompany(value)
      .subscribe((data: DocResponse) => {
        this.isUploading = false;
        if (data.success) {
          this.docUrl = url;
          this.toaster.success("Upload succeseful");
        } else {
          this.toaster.error(
            data.message ? data.message : "Error while uploading"
          );
        }
      });
  }

  loadToPdfViewerCompleted() {
    this.isUploading = false;
  }

  uploadNewPDF() {
    this.clickEventSubject.next();
  }
}
