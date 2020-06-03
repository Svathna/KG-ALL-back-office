import { createReducer, Action, on } from '@ngrx/store';
import { CompanyDetail } from '../../model/company.model';
import * as fromCompany from '../actions/company.action';

export interface CompanysState {
    companys: CompanyDetail[];
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
    on(fromCompany.getCompanys, (state) => {
        console.log(state);
        return ({
            ...state,
            isFetching: true
        });
    }),
    on(fromCompany.getCompanysSuccess, (state, { companys }) => {
        console.log(state);
        console.log(companys);
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
