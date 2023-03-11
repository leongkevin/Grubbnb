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

const CREATE_SPOTIMAGES = 'spots/CREATE_SPOTIMAGES';
export const createSpotImages = (spotImagesArr) => {
	return {
		type: CREATE_SPOTIMAGES,
		payload: spotImagesArr,
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
			newState[action.payload.id] = action.payload;
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
			// console.log(`${action.spotId}`);
			delete newState[action.spotId];
			return newState;
		}
		case UPDATE_SPOT: {
			const newState = {
				...state,
				...action.payload,
			};
			// console.log(`${state}`);
			// console.log(`${action.payload}`);
			newState[action.payload.id] = action.payload;
			return newState;
		}
		case CREATE_SPOTIMAGES:
			// const newState = {
				// console.log(action)
				return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
				},
				// return newState;
			};
		default:
			return state;
	}
};

export const publishSpot = (spot, imageArr) => async (dispatch) => {
	let {
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
		imagesArr,
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
			imagesArr,
		}),
	});

	imagesArr = imagesArr.map((url,i) => { // we need to turn the image arr into arr of obj, isntead of arr of str
        let obj = {}
        if (i === 0) {
            obj.preview = true;
            obj.url = url;
        } else {
            obj.preview = false;
            obj.url = url;
        }
        return obj;
    })
// console.log(imagesArr, "152")

	const newSpot = await response.json(response);


	console.log(`this is imageArr: ${imagesArr}`)
	for await (let img of imagesArr) {
		const submitImages = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(img),
		});
		const imgURL = await submitImages.json();
		dispatch(createSpotImages(imgURL));
	}

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
