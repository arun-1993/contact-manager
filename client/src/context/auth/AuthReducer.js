import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED } from '../Types';

const AuthReducer = (state, action) => {
	switch(action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload
			};

		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};

		case REGISTER_FAILURE:
		case LOGIN_FAILURE:
		case LOGOUT:
		case AUTH_ERROR:
			localStorage.removeItem('token');

			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			}

		default:
			return state;
	}
};

export default AuthReducer;
