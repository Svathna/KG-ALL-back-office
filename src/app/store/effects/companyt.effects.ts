import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as CompanyAction from '../actions/company.action';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { CompanyResponse } from '../../model/company.model';
import { of } from 'rxjs';

@Injectable()
export class CompanysEffects {

  constructor (
    private actions$: Actions,
    private companyService: CompanyService,
    private toaster: ToastrService
  ) { }

  getCompanys$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyAction.getCompanys),
    exhaustMap(() =>
      this.companyService.getCompanys().pipe(
        map((companys: CompanyResponse[]) => {
          return CompanyAction.getCompanysSuccess({ companys })
        }),
        catchError(({ error }) => {
            this.toaster.error(error.message);
            return of(CompanyAction.getComapanysFailure({ error: error.message? error.message : null }));
        })
      )
    )
  ));

}
