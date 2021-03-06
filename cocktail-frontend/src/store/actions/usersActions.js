import axios from '../../axios-api';
import {NotificationManager} from "react-notifications";
import {fetchCocktails} from "./cocktailActions";

export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const LOGOUT_USER = "LOGOUT_USER";

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUser = () => {
    return dispatch => {

        return axios.delete('/users/sessions').then(
            () => {
                dispatch({type: LOGOUT_USER});
                NotificationManager.success('Logged out');
                dispatch(fetchCocktails());
            },
            error => {
                NotificationManager.error('Could not logout!')
            }
        )
    }
};

export const facebookLogin = userData => {
    return dispatch => {
        return axios.post('/users/facebookLogin', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Logged in via Facebook');
                dispatch(fetchCocktails());
            },
            () => {
                dispatch(loginUserFailure('Validation via facebook failed'))
            }
        )
    }
};