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

const CREATE_SPOT = 'spots/create_spot';
export const createSpots = (spot) => {
	return {
		type: CREATE_SPOT,
		spot,
	};
};

export const spotReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_SPOT: {
			const newState = { ...state };
			newState[action.spot.id] = action.spot;
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
	dispatch(createSpots(spot));
	return data;
};

export default spotReducer;
