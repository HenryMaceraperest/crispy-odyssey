import { ROUTES_ACTION_TYPES } from "./route.types";

import { createAction } from '../../utils/reducer/reducer.utils';


export const setRoutes = (routes) => createAction(ROUTES_ACTION_TYPES.SET_ROUTES, routes);