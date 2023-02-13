import { csrfFetch } from './csrf';

// fetch('/api/session', {
// 	method: 'POST',
// 	headers: {
// 	  "Content-Type": "application/json",
// 	  "XSRF-TOKEN": `r5usprm0-3GoSaJUfIQRuOJkNZBndrDb0Q38`
// },
// 	body: JSON.stringify({ credential: 'Demo-lition', password: 'password' })
//   }).then(res => res.json()).then(data => console.log(data));

const initialState = {};

// const CREATE_SPOT = 'spots/CREATE_SPOT';
// export const createSpot = (spot) => {
// 	return {
// 		type: CREATE_SPOT,
// 		payload: spot,
// 	};
// };

const CREATE_SPOT = 'spots/CREATE_SPOT';
export const createSpot = (spot) => {
	return {
		type: CREATE_SPOT,
		payload: spot,
	};
};

const GET_SPOTS = 'spots/GET_SPOTS';
export const getAllSpots = (spots) => {
	// console.log(spots);
	return {
		type: GET_SPOTS,
		payload: spots,
	};
};

const REMOVE_SPOT = 'spots/REMOVE_SPOT';
export const removeSpot = (spotId) => ({
	type: REMOVE_SPOT,
	payload: spotId,
});

const UPDATE_SPOT = 'spots/UPDATE_SPOT';
export const editSpot = (spotId) => ({
	type: UPDATE_SPOT,
	payload: spotId,
});

export const spotReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_SPOT: {
			const newState = { ...state };
			// newState[action.spot.id] = action.spot;
			// console.log(newState[action.spot])
			newState[action.payload.id] = action.payload
			// console.log(newState[action.spot])
			return newState;
		}
		case GET_SPOTS: {
			const newState = {}; //
			// newState[action.payload] = action.payload; //
			// console.log(`This is ${action.payload}`);
			action.payload.Spots.forEach((spot) => {
				newState[spot.id] = spot;
			});
			// delete newState[action.payload];
			return newState;
		}
		case REMOVE_SPOT: {
			const newState = { ...state };
			console.log(`${action.spotId}`);
			delete newState[action.spotId];
			return newState;
		}
		case UPDATE_SPOT: {
			const newState = {
				...state,
				...action.payload,
			};
			return newState;
		}
		default:
			return state;
	}
};

export const publishSpot = (spot) => async (dispatch) => {
	// console.log(spot)
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
	const newSpot = await response.json(response);
	dispatch(createSpot(newSpot));
	return newSpot.id;
};

export const getSpots = () => async (dispatch) => {
	const response = await csrfFetch('/api/spots');
	const spots = await response.json();
	// console.log(spots);
	dispatch(getAllSpots(spots));
	// console.log(spots);
	return response;
};

export const deleteSpotAction = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'DELETE',
	});
	const spot = await response.json();
	dispatch(removeSpot(spotId));
	return spot;
};

export const updateSpotAction = (spot) => async (dispatch) => {
	// console.log(spot)
	const response = await csrfFetch(`/api/spots/${spot.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(spot),
	});
	const newSpot = await response.json(response);
	dispatch(editSpot(newSpot));
	return spot;
};

export default spotReducer;
