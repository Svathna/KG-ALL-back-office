
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { AdminGuard } from "./admin.guard";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';
import { ToastrModule } from 'ngx-toastr';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthService } from './service/auth.service';
import { SecureInnerPagesGuardGuard } from './secure-inner-pages-guard.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { CompanysComponent } from './companys/companys.component';
import { MaterialComponentsModule } from './material-component/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { CompanysEffects } from './store/effects/companyt.effects';
import { ModalsModule } from './modals/modals.module';
import { MatFormFieldModule } from '@angular/material';
import { CompanyDetailComponent } from './companys/company-detail/company-detail.component';
import { GeneralComponent } from './companys/company-detail/general/general.component';
import { MocComponent } from './companys/company-detail/moc/moc.component';
import { MocCertificateUploaderComponent } from './companys/company-detail/moc-certificate-uploader/moc-certificate-uploader.component';
import { BusinessExtractUploaderComponent } from './companys/company-detail/business-extract-uploader/business-extract-uploader.component';
import { DotComponent } from './companys/company-detail/dot/dot.component';
import { MocDocsComponent } from './companys/company-detail/moc-docs/moc-docs.component';
import { DotDocsComponent } from './companys/company-detail/dot-docs/dot-docs.component';
import { DocUploaderComponent } from './companys/company-detail/doc-uploader/doc-uploader.component';
import { RequestsComponent } from './requests/requests.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AuthPageComponent,
    HomePageComponent,
    CompanysComponent,
    CompanyDetailComponent,
    GeneralComponent,
    MocComponent,
    MocCertificateUploaderComponent,
    BusinessExtractUploaderComponent,
    DotComponent,
    MocDocsComponent,
    DotDocsComponent,
    DocUploaderComponent,
    RequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ShowHidePasswordModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ToastrModule.forRoot(),
    FlexLayoutModule,
    MaterialComponentsModule,
    HttpClientModule,
    SharedModule,
    PdfViewerModule,
    MatFormFieldModule,
    ModalsModule,
    RouterModule.forRoot(AppRoutes, { useHash: true }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([CompanysEffects])
  ],
  providers: [
    AdminGuard,
    SecureInnerPagesGuardGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [GeneralComponent, MocComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
