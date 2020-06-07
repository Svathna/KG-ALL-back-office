import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompanyModalComponent } from './register-company-modal/register-company-modal.component';
import { MatIconModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [RegisterCompanyModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule
  ],
  exports: [RegisterCompanyModalComponent],
  entryComponents: [RegisterCompanyModalComponent]
})
export class ModalsModule { }
