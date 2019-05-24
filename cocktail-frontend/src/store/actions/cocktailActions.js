import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_COCKTAILS_FAILURE = "FETCH_COCKTAILS_FAILURE";

export const SEND_COCKTAILS_SUCCESS = 'SEND_COCKTAILS_SUCCESS';
export const SEND_COCKTAILS_FAILURE = "SEND_COCKTAILS_FAILURE";

export const TOGGLE_PUBLISHED_SUCCESS = 'TOGGLE_PUBLISHED_SUCCESS';
export const TOGGLE_PUBLISHED_FAILURE = "TOGGLE_PUBLISHED_FAILURE";

export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = "DELETE_FAILURE";

export const SEND_RATING_SUCCESS = 'SEND_RATING_SUCCESS';

export const fetchCocktailsSuccess = data => {
    return {type: FETCH_COCKTAILS_SUCCESS, data};
};

const fetchCocktailsFailure = error => ({type: FETCH_COCKTAILS_FAILURE, error});

const sendCocktailSuccess = () => ({type: SEND_COCKTAILS_SUCCESS});
const sendCocktailFailure = error => ({type: SEND_COCKTAILS_FAILURE, error});

const togglePublishedSuccess = () => ({type: TOGGLE_PUBLISHED_SUCCESS});

const togglePublishedFailure = error => ({type: TOGGLE_PUBLISHED_FAILURE, error});

const deleteSuccess = () => ({type: DELETE_SUCCESS});

const deleteFailure = error => ({type: DELETE_FAILURE, error});

const sendRatingSuccess = (cocktail) => ({type: SEND_RATING_SUCCESS, cocktail});

export const fetchCocktails = () => {
    return dispatch => {
        return axios.get('/cocktails').then(
            response => dispatch(fetchCocktailsSuccess(response.data)),
            error => dispatch(fetchCocktailsFailure(error))
        );
    };
};


export const sendCocktail = (data) => {

    return dispatch => {
        return axios.post('/cocktails', data).then(
            () => {
                dispatch(sendCocktailSuccess());
                NotificationManager.success('Created successfully');
                dispatch(push('/'));
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(sendCocktailFailure(error.response.data));
                } else {
                    dispatch(sendCocktailFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const togglePublished = (id) => {
    return dispatch => {
        return axios.put('/cocktails/' + id +'/toggle_published').then(
            () => {
                dispatch(togglePublishedSuccess());
                NotificationManager.success('Toggled successfully');
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(togglePublishedFailure(error.response.data));
                } else {
                    dispatch(togglePublishedFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const deleteItem = (id) => {
    return dispatch => {
        return axios.delete('/cocktails/' + id +'/delete').then(
            () => {
                dispatch(deleteSuccess());
                NotificationManager.success('Deleted successfully');
            },
            error => {
                if (error.response && error.response.data) {
                    dispatch(deleteFailure(error.response.data));
                } else {
                    dispatch(deleteFailure({global: 'No connection'}))
                }

            }
        )
    }
};

export const sendRating = (newRating, cocktailId) => {
    return dispatch => {
        return axios.post('/cocktails/' + cocktailId + '/rating', {newRating: newRating}).then(
            (result) => {
                console.log(result.data);
                dispatch(sendRatingSuccess(result.data))
            }
        );
    };
};