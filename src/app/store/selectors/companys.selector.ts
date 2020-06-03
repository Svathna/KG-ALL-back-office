import { createSelector, createFeatureSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CompanysState } from "../reducers/company.reducer";


// export const selectCompanyState = createFeatureSelector<AppState, CompanysState>(
//     'companys',
// );

export const selectCompanyState = (state: AppState) => state.companys;

export const selectAllCompanys = createSelector(
    selectCompanyState,
    (state: CompanysState) => {
        console.log(state);
        return state.companys
    }
);

// export const selectVenue = (slug: string) =>
//     createSelector(
//         selectVenuesState,
//         (state: VenuesState): Venue => state.entities[slug],
//     );

// export const selectVenuesCount = createSelector(
//     selectVenuesState,
//     (state: VenuesState): number => state.count,
// );

// export const selectIsFetchingVenue = createSelector(
//     selectVenuesState,
//     (state: VenuesState): boolean => state.isFetchingVenue,
// );

// export const selectIsFetchingVenues = createSelector(
//     selectVenuesState,
//     (state: VenuesState): boolean => state.isFetchingVenues,
// );

// export const selectTotalVenues = createSelector(
//     selectVenuesState,
//     (state: VenuesState): number => state.total,
// );

// export const selectCountVenues = createSelector(
//     selectVenuesState,
//     (state: VenuesState): number => state.count,
// );
