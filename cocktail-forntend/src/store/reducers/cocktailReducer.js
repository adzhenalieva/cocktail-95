import {FETCH_COCKTAILS_FAILURE, FETCH_COCKTAILS_SUCCESS, SEND_COCKTAILS_FAILURE} from "../actions/cocktailActions";


const initialState = {
    cocktails: [],
    error: null
};

const cocktailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COCKTAILS_SUCCESS:
            return {
                ...state,
                cocktails: action.data
            };
        case SEND_COCKTAILS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case FETCH_COCKTAILS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
export default cocktailReducer;