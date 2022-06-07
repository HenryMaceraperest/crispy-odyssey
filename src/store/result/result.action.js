import { SEARCH_RESULT_ACTION_TYPES } from "./result.types";

import { createAction } from '../../utils/reducer/reducer.utils';

export const setSearchResult = (searchResult) => createAction(SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT, searchResult);
