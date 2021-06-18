import {
    AUTH,
    FETCH_AUTH_FAILURE,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_REQUEST
} from "./types";

const initialState = {
    data: null,
    loading: false,
    error: null
};
export default (state = initialState, action: AUTH) => {
    //console.log(action.type, state);

    switch (action.type) {
        case FETCH_AUTH_REQUEST:
            return {
                ...state,
                loading: true
            };

        case FETCH_AUTH_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: null
            };

        case FETCH_AUTH_FAILURE:
            return {
                data: initialState.data,
                loading: false,
                error: action.payload
            };

        default:
            return state;
    }
};
