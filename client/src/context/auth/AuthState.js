import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import SetAuthToken from '../../utils/SetAuthToken';
import { AUTH_ERROR, CLEAR_ERRORS, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED } from '../Types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: false,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const loadUser = async () => {
		if(localStorage.getItem('token')) {
			SetAuthToken(localStorage.token);
		}

		try {
			const response = await axios.get('/api/auth');

			dispatch({ type: USER_LOADED, payload: response.data });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	const register = async formData => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const response = await axios.post('/api/users', formData, config);
			
			dispatch({ type: REGISTER_SUCCESS, payload: response.data });
			
			SetAuthToken(response.data.token);
			
			loadUser();
		} catch (error) {
			dispatch({ type: REGISTER_FAILURE, payload: error.response.data.msg });
		}
	};
	
	const login = async formData => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const response = await axios.post('/api/auth', formData, config);

			dispatch({ type: LOGIN_SUCCESS, payload: response.data });

			SetAuthToken(response.data.token);

			loadUser();
		} catch (error) {
			dispatch({ type: LOGIN_FAILURE, payload: error.response.msg });
		}
	};

	const logout = () => {
		dispatch({ type: LOGOUT })
	};

	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				loadUser,
				register,
				login,
				logout,
				clearErrors
			}}>
			{ props.children }
		</AuthContext.Provider>
	)
}

export default AuthState;
