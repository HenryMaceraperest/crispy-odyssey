import { VALIDITY_ACTION_TYPES } from "./validity.types";

import { createAction } from '../../utils/reducer/reducer.utils';


export const setValidity = (validity) => createAction(VALIDITY_ACTION_TYPES.SET_VALIDITY, validity);