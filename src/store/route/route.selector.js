import { createSelector } from "reselect";

const selectRoutesReducer = (state) => state.routes;

export const selectRoutes = createSelector(
    [selectRoutesReducer],
    (routesSlice) => routesSlice.routes
);