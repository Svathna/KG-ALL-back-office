import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { CompanysState, CompanysReducer } from './company.reducer';

export interface State {
  companyState: CompanysState
}

export const reducers: ActionReducerMap<State> = {
  companyState: CompanysReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
