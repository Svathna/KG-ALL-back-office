import { createAction, props } from '@ngrx/store';
import { CompanyResponse } from '../../model/company.model';

export const getCompanys = createAction('[Company List Page] Get Companys');
export const getCompanysSuccess = createAction('[Company List Page] Get Companys Success', props<{ companys: CompanyResponse[] }>());
export const getComapanysFailure = createAction('[Company List Page] Get Companys Failure', props<{ error: string }>());
// export const getCompanyById = createAction('[Company Page] Get Company By Id', props<{ id: string }>());
// export const getProfileSuccessById = createAction('[Company Page] Get Company Success By Id', props<{ company:  CompanyResponse}>());

// export const searchVenuesRequest = createAction(
//     '[Venues] Search Request',
//     props<{ search: VenuesSearchRequest }>(),
// );

// export const searchVenuesSuccess = createAction(
//     '[Venues] Search Success',
//     props<{ data: VenuesSearchResponse }>(),
// );

// export const searchVenuesFailure = createAction(
//     '[Venues] Search Failure',
//     props<{ error: string }>(),
// );

// export const searchVenuesNextPageRequest = createAction(
//     '[Venues] Search Next Page Request',
//     props<{ search: VenuesSearchRequest }>(),
// );

// export const searchVenuesNextPageSuccess = createAction(
//     '[Venues] Search Next Page Success',
//     props<{ data: VenuesSearchResponse }>(),
// );

// export const searchVenuesNextPageFailure = createAction(
//     '[Venues] Search Next Page Failure',
//     props<{ error: string }>(),
// );

// export const getVenueViaSlugRequest = createAction(
//     '[Venue Detail] Venue Data Using Slug Request',
//     props<{ query: VenueSlugRequest }>(),
// );

// export const getVenueViaSlugSuccess = createAction(
//     '[Venue Detail] Venue Data Using Slug Success',
//     props<{ data: VenueSlugResponse }>(),
// );

// export const getVenueViaSlugFailure = createAction(
//     '[Venue Detail] Venue Data Using Slug Failure',
//     props<{ error: string }>(),
// );

// export const myVenuesRequest = createAction(
//     '[Venues] My Venues Request',
// );

// export const myVenuesSuccess = createAction(
//     '[Venues] My Venues Success',
//     props<{ data: VenuesSearchResponse }>(),
// );

// export const myVenuesFailure = createAction(
//     '[Venues] My Venues Failure',
//     props<{ error: string }>(),
// );