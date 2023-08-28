import { AUTH_ERROR, CLEAR_ERRORS, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED } from '../Types';

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
			localStorage.setItem('token', action.payload.token);
			console.log('In register success dispatch');
			console.log(localStorage);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};

		case REGISTER_FAILURE:
			console.log('In Register failure dispatch');
			// fall through

		case AUTH_ERROR:
			console.log('In auth error dispatch');
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
