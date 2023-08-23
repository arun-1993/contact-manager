import { REMOVE_ALERT, SET_ALERT } from '../Types';

const AlertReducer = (state, action) => {
	switch(action.type) {
		case SET_ALERT:
			return [...state, action.payload];

		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== action.payload.id);

		default:
			return state;
	}
};

export default AlertReducer;
