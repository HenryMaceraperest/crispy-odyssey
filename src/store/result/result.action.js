import { useSelector } from "react-redux";

import { SEARCH_RESULT_ACTION_TYPES } from "./result.types";
import { selectSearchResultFromQuery, selectSearchResultToQuery, selectSearchResultDateQuery } from './result.selector';

import { createAction } from '../../utils/reducer/reducer.utils';

export const setSearchResultFromQuery = (searchResult) => createAction(SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_FROM_QUERY, searchResult);

export const setSearchResultToQuery = (searchResult) => createAction(SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_TO_QUERY, searchResult);

export const setSearchResultDateQuery = (searchResult) => createAction(SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_DATE_QUERY, searchResult);

export const setSearchResultConnectingFlight = (searchResult) => createAction(SEARCH_RESULT_ACTION_TYPES.SET_SEARCH_RESULT_CONNECTING_FLIGHT, searchResult);

export const fetchSearchResultStart = () => createAction(SEARCH_RESULT_ACTION_TYPES.FETCH_SEARCH_RESULT_START);

export const fetchSearchResultSuccess = (searchResult) => createAction(SEARCH_RESULT_ACTION_TYPES.FETCH_SEARCH_RESULT_SUCCESS, searchResult);

export const fetchSearchResultFailed = (error) => createAction(SEARCH_RESULT_ACTION_TYPES.FETCH_SEARCH_RESULT_FAILED, error);

export const fetchSearchResultAsync = () => async (dispatch) => {
    dispatch(fetchSearchResultStart());

    try {
        const dateQuery = useSelector(selectSearchResultDateQuery);
        const fromQuery = useSelector(selectSearchResultFromQuery);
        const toQuery = useSelector(selectSearchResultToQuery);

        if (dateQuery === null) {
            await fetch(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}`)
                .then((response) => response.json())
                .then((result) => dispatch(fetchSearchResultSuccess(result)))
                .catch((error) => console.log("An error occured!" + error))
        } else {
            await fetch(`http://localhost:4000/searchres?from=${fromQuery}&to=${toQuery}&date=${dateQuery}`)
                .then((response) => response.json())
                .then((result) => dispatch(fetchSearchResultSuccess(result)))
                .then((result) => result.data[0].directFlight ? setSearchResultConnectingFlight(false) : setSearchResultConnectingFlight(true))
                .catch((error) => console.log("An error occured!" + error))

        }
    } catch (error) {
        dispatch(fetchSearchResultFailed(error));
    }
}