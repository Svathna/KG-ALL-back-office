import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CompanyService } from '../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { Service } from '../model/service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  docUrl: string;
  isUploading = false;
  isFetching = false;
	serviceForm: FormGroup;
	service: Service;
	isEditForm = false;

  constructor(
		private formBuilder: FormBuilder,
		private companyService: CompanyService,
    private toaster: ToastrService,
  ) {}

  ngOnInit() {
		this.getSevice();
	}
	
	getSevice() {
		this.isFetching = true;
		this.companyService.getService().subscribe((data: any) => {
			this.isFetching = false;
			if (data && data.success) {
				if (data.service) {
					this.service = data.service;
					this.buildEditForm();
				} else {
					this.buildNewForm();
				}
			}
		});
	}

	buildEditForm() {
		this.isEditForm = true;
		const { monthlyTaxService, annualTaxService, docUrl } = this.service;
		this.docUrl = docUrl;
    this.serviceForm = this.formBuilder.group({
      threshold: new FormControl(monthlyTaxService.threshold, [Validators.required, Validators.min(10)]),
      moreThanThresholdPrice: new FormControl(monthlyTaxService.moreThanThresholdPrice, [Validators.required, Validators.min(1)]),
      lessThanThresholdPrice: new FormControl(monthlyTaxService.lessThanThresholdPrice, [Validators.required, Validators.min(1)]),
      salaryTaxPrice: new FormControl(annualTaxService.salaryTaxPrice, [Validators.required, Validators.min(1)]),
      patentTaxPrice: new FormControl(annualTaxService.patentTaxPrice, [Validators.required, Validators.min(1)]),
      trademarkTaxPrice: new FormControl(annualTaxService.trademarkTaxPrice, [Validators.required, Validators.min(1)]),
      propertyTaxPrice: new FormControl(annualTaxService.propertyTaxPrice, [Validators.required, Validators.min(1)]),
      transportationTaxPrice: new FormControl(annualTaxService.transportationTaxPrice, [Validators.required, Validators.min(1)]),
      docUrl: new FormControl(docUrl, [Validators.required]),
    });
  }

  buildNewForm() {
		this.isEditForm = false;
    this.serviceForm = this.formBuilder.group({
      threshold: new FormControl(50, [Validators.required, Validators.min(10)]),
      moreThanThresholdPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      lessThanThresholdPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      salaryTaxPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      patentTaxPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      trademarkTaxPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      propertyTaxPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      transportationTaxPrice: new FormControl('', [Validators.required, Validators.min(1)]),
      docUrl: new FormControl('', [Validators.required]),
    });
  }

  uploadedCompleted(response) {
    this.docUrl = response.secure_url;
    this.serviceForm.controls['docUrl'].setValue(this.docUrl);
  }

  onLoading(isLoading) {
    this.isUploading = isLoading;
  }

  loadToPdfViewerCompleted() {
    this.isUploading = false;
  }

  save() {
    if (this.serviceForm.invalid) {
      return;
    }
		this.isFetching = true;
		const value = this.serviceForm.value;
		this.companyService.createService(value).subscribe((data: any) => {
			this.isFetching = false;
			if (data && data.success) {
				this.toaster.success("Successful");
				if (data.service) {
					this.service = data.service;
					this.buildEditForm();
				}
			} else {
				this.toaster.error("Failed! try again.");
			}
		});
	}

	update() {
		if (this.serviceForm.invalid || !this.service) {
      return;
    }
		this.isFetching = true;
		const value = this.serviceForm.value;
		this.companyService.updateService(this.service._id, value).subscribe((data: any) => {
			this.isFetching = false;
			if (data && data.success) {
				this.toaster.success("Updated Successful");
			} else {
				this.toaster.error("Failed! try again.");
			}
		});
	}
	
	reset() {
		this.buildNewForm();
		this.docUrl = '';
	}

	resetToPrevious() {
		this.buildEditForm();
	}
}
