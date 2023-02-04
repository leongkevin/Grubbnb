import { csrfFetch } from './csrf';

// fetch('/api/session', {
// 	method: 'POST',
// 	headers: {
// 	  "Content-Type": "application/json",
// 	  "XSRF-TOKEN": `r5usprm0-3GoSaJUfIQRuOJkNZBndrDb0Q38`
// 	},
// 	body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));

const initialState = {};

const CREATE_SPOT = 'spots/CREATE_SPOT';
export const createSpot = (spot) => {
	return {
		type: CREATE_SPOT,
		spot,
	};
};

const REMOVE_SPOT = 'reports/remove_report';
export const removeSpot = (id) => ({
	type: REMOVE_SPOT,
	id,
});

export const spotReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_SPOT: {
			const newState = { ...state };

			// newState[action.spot.id] = action.spot;
			// console.log(newState[action.spot])
			newState[action.spot] = action.spot;

			// console.log(newState[action.spot])
			return newState;
		}
		case REMOVE_SPOT: {
			const newState = { ...state };
			delete newState[action.id];
			return newState;
		}
		default:
			return state;
	}
};

export const publishSpot = (spot) => async (dispatch) => {
	const {
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	} = spot;
	const response = await csrfFetch('/api/spots', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		}),
	});
	const data = await response.json();
	dispatch(createSpot(data.spot));
	return data;
};

export const deleteSpot = (id) => async (dispatch) => {


	dispatch(createSpot());
	return;
};

export default spotReducer;
