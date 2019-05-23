import axios from "../../axios-api";
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_COCKTAILS_SUCCESS = 'FETCH_COCKTAILS_SUCCESS';
export const FETCH_COCKTAILS_FAILURE = "FETCH_COCKTAILS_FAILURE"

export const SEND_COCKTAILS_SUCCESS = 'SEND_COCKTAILS_SUCCESS';
export const SEND_COCKTAILS_FAILURE = "SEND_COCKTAILS_FAILURE";

export const fetchCocktailsSuccess = data => {
    return {type: FETCH_COCKTAILS_SUCCESS, data};
};

const fetchCocktailsFailure = error => ({type: FETCH_COCKTAILS_FAILURE, error});

const sendCocktailSuccess = () => ({type: SEND_COCKTAILS_SUCCESS});
const sendCocktailFailure = error => ({type: SEND_COCKTAILS_FAILURE, error});

export const fetchCocktails = () => {
    return dispatch => {
        return axios.get('/cocktails').then(
            response => dispatch(fetchCocktailsSuccess(response.data)),
            error => dispatch(fetchCocktailsFailure(error))
        );
    };
};


export const sendCocktail = data => {
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