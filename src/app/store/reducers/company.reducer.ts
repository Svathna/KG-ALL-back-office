import { createReducer, Action, on } from '@ngrx/store';
import { CompanyResponse } from '../../model/company.model';
import * as fromCompany from '../actions/company.action';

export interface CompanysState {
    companys: CompanyResponse[];
    isFetching: boolean;
    error: boolean | null;
}

export const initialState: CompanysState = {
    companys: [],
    isFetching: false,
    error: false,
};


const companysReducer = createReducer(
    initialState,
    // Search
    on(fromCompany.getCompanys, (state) => ({ ...state, isFetching: true })),
    on(fromCompany.getCompanysSuccess, (state, { companys }) => {
        return ({
            ...state,
            companys,
            isFetching: false,
            error: false
        });
    }),
    on(fromCompany.getComapanysFailure, (state) => {
        return ({
            ...state,
            isFetching: false,
            error: true
        });
    }),

);

export const CompanysReducer = (
    state: CompanysState | undefined,
    action: Action,
) => {
    return companysReducer(state, action);
};
