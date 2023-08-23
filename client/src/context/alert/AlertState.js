import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { REMOVE_ALERT, SET_ALERT } from '../Types';

const AlertState = props => {
	const initialState = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	const setAlert = (message, type, timeout = 500) => {
		const id = v4();
		dispatch({ type: SET_ALERT, payload: { message, type, id } });
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
	}

	return <AlertContext.Provider
		value={{
			alerts: state,
			setAlert
		}}>
		{ props.children }
	</AlertContext.Provider>
}

export default AlertState;
