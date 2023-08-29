import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);

	const { isAuthenticated, loading } = authContext;

	if(!isAuthenticated && !loading) {
		return <Navigate to='/login' />;
	} else {
		return <Component />;
	}
}

export default PrivateRoute