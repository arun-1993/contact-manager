import { CLEAR_ERRORS, REGISTER_FAILURE, REGISTER_SUCCESS } from '../Types';

const AuthReducer = (state, action) => {
	switch(action.type) {
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);

			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};

		case REGISTER_FAILURE:
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
