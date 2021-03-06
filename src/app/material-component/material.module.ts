import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { CompanyCardComponent } from './company-card/company-card.component';
import { UploaderComponent } from './uploader/uploader.component';
import { DragDropUploaderComponent } from './drag-drop-uploader/drag-drop-uploader.component';
import { RequestCardComponent } from './request-card/request-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  providers: [],
  declarations: [
    CompanyCardComponent,
    UploaderComponent,
    DragDropUploaderComponent,
    RequestCardComponent
  ],
  exports: [CompanyCardComponent, UploaderComponent, DragDropUploaderComponent, RequestCardComponent]
})
export class MaterialComponentsModule {}
