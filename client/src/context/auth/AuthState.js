import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { CLEAR_ERRORS, REGISTER_FAILURE, REGISTER_SUCCESS } from '../Types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const loadUser = () => {

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
