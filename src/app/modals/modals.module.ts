import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompanyModalComponent } from './register-company-modal/register-company-modal.component';
import { MatIconModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RemoveCompanyConfirmModalComponent } from './remove-company-confirm-modal/remove-company-confirm-modal.component';

@NgModule({
  declarations: [RegisterCompanyModalComponent, RemoveCompanyConfirmModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  exports: [RegisterCompanyModalComponent],
  entryComponents: [RegisterCompanyModalComponent, RemoveCompanyConfirmModalComponent]
})
export class ModalsModule { }
