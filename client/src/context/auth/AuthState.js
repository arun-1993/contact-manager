import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import SetAuthToken from '../../utils/SetAuthToken';
import { AUTH_ERROR, CLEAR_ERRORS, REGISTER_FAILURE, REGISTER_SUCCESS, USER_LOADED } from '../Types';

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
			console.log('Setting AuthToken');
			SetAuthToken(localStorage.token);
		}

		try {
			console.log('Trying to load user');
			console.log(localStorage);
			const response = await axios.get('/api/auth');
			console.log(response);
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
			console.log('Registering user');
			const response = await axios.post('/api/users', formData, config);
			console.log(response);
			console.log('Before register dispatch');
			console.log(localStorage);
			dispatch({ type: REGISTER_SUCCESS, payload: response.data });
			console.log('After register dispatch');
			console.log(localStorage);
			loadUser();
			console.log('After loadUser');
			console.log(localStorage);
		} catch (error) {
			dispatch({ type: REGISTER_FAILURE, payload: error.response.data.msg });
		}
	};
	
	const login = () => {

	};

	const logout = () => {

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
