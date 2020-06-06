import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterCompanyModalComponent } from './register-company-modal/register-company-modal.component';

@NgModule({
  declarations: [RegisterCompanyModalComponent],
  imports: [
    CommonModule
  ],
  exports: [RegisterCompanyModalComponent],
  entryComponents: [RegisterCompanyModalComponent]
})
export class ModalsModule { }
