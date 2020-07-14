import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompanyModalComponent } from './register-company-modal/register-company-modal.component';
import { MatIconModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RemoveCompanyConfirmModalComponent } from './remove-company-confirm-modal/remove-company-confirm-modal.component';
import { AddMocModalComponent } from './add-moc-modal/add-moc-modal.component';
import { AddDotModalComponent } from './add-dot-modal/add-dot-modal.component';
import { UploadDocModalComponent } from './upload-doc-modal/upload-doc-modal.component';
import { MaterialComponentsModule } from '../material-component/material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { RejectRequestConfirmModalComponent } from './reject-request-confirm-modal/reject-request-confirm-modal.component';
import { AddTaxPerMonthModalComponent } from './add-tax-per-month-modal/add-tax-per-month-modal.component';
import { AddTaxPerYearModalComponent } from './add-tax-per-year-modal/add-tax-per-year-modal.component';

@NgModule({
  declarations: [
    RegisterCompanyModalComponent,
    RemoveCompanyConfirmModalComponent,
    AddMocModalComponent,
    AddDotModalComponent,
    UploadDocModalComponent,
    RejectRequestConfirmModalComponent,
    AddTaxPerMonthModalComponent,
    AddTaxPerYearModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    PdfViewerModule,
    FlexLayoutModule,
    MaterialComponentsModule
  ],
  exports: [RegisterCompanyModalComponent],
  entryComponents: [
    RegisterCompanyModalComponent,
    RemoveCompanyConfirmModalComponent,
    AddMocModalComponent,
    AddDotModalComponent,
    UploadDocModalComponent,
    RejectRequestConfirmModalComponent,
    AddTaxPerMonthModalComponent,
    AddTaxPerYearModalComponent,
  ],
})
export class ModalsModule { }
