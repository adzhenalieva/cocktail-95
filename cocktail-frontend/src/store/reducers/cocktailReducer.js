import {FETCH_COCKTAILS_FAILURE, FETCH_COCKTAILS_SUCCESS, SEND_COCKTAILS_FAILURE, SEND_RATING_SUCCESS} from "../actions/cocktailActions";


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
        case SEND_RATING_SUCCESS:
            const idCocktail = action.cocktail._id;
            const ratings = action.cocktail.ratings;
            return {
                ...state,
                cocktails: state.cocktails.map(cocktail => cocktail._id === idCocktail
                    ? {...cocktail, ratings: ratings}
                    : cocktail
                )
            };
        default:
            return state;
    }
};
export default cocktailReducer;