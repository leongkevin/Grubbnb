// const ADD_SPOT = 'session/setSpot';

// const setSpot = (spot) => {
// 	return {
// 		type: ADD_SPOT,
// 		payload: spot,
// 	};
// };

// const initialState = { spot: null };

// export default sessionReducer = (state = initialState, action) => {
// 	let newState;
// 	switch (action.type) {
// 		case ADD_SPOT:
// 			newState = Object.assign({}, state);
// 			newState.spot = action.payload;
// 			return newState;
// 		default:
// 			return state;
// 	}
// };
// import Cookies from 'js-cookie';

// async function custom(url, options = {}) {
// 	// set options.method to 'GET' if there is no method
// 	options.method = options.method || 'GET';
// 	// set options.headers to an empty object if there is no headers
// 	options.headers = options.headers || {};

// 	// if the options.method is not 'GET', then set the "Content-Type" header to
// 	// "application/json", and set the "XSRF-TOKEN" header to the value of the
// 	// "XSRF-TOKEN" cookie
// 	if (options.method.toUpperCase() !== 'GET') {
// 		options.headers['Content-Type'] =
// 			options.headers['Content-Type'] || 'application/json';
// 		options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
// 	}
// 	// call the default window's fetch with the url and the options passed in
// 	const res = await window.fetch(url, options);

// 	// if the response status code is 400 or above, then throw an error with the
// 	// error being the response
// 	if (res.status >= 400) throw res;

// 	// if the response status code is under 400, then return the response to the
// 	// next promise chain
// 	return res;
// }

// export const createSpot = (spot) => async (dispatch) => {
// 	const { username, firstName, lastName, email, password } = spot;
// 	const response = await custom('/api/spots', {
// 		method: 'POST',
// 		body: JSON.stringify({
// 			username,
// 			firstName,
// 			lastName,
// 			email,
// 			password,
// 		}),
// 	});
// 	const data = await response.json();
// 	dispatch(setSpot(data.spot));
// 	return response;
// };


// const ADD_SPOT = 'session/setSpot';

// const setSpot = (spot) => {
// 	return {
// 		type: ADD_SPOT,
// 		payload: spot,
// 	};
// };

// const initialState = { spot: null };

let initialSpots = [
	{
		ownerId: 1,
		address: '1065 6th Ave',
		city: 'New York',
		state: 'New York',
		country: 'United States',
		lat: 40.75376,
		lng: -73.98496,
		name: '5 Bryant Park',
		description: 'Contemporary',
		price: 100,
	},
	{
		ownerId: 2,
		address: '555 E 90th St',
		city: 'New York',
		state: 'New York',
		country: 'United States',
		lat: 40.77771,
		lng: -73.94331,
		name: 'Asphalt Green UES',
		description: 'Antiquated',
		price: 100,
	},
	{
		ownerId: 2,
		address: '212 North End Ave',
		city: 'New York',
		state: 'New York',
		country: 'United States',
		lat: 40.71597,
		lng: -74.01475,
		name: 'Asphalt Green BPC',
		description: 'Contemporary',
		price: 100,
	},
]

const initialSpot = { spot: null }

initialSpots.forEach((spot) => {
    initialSpot[spot.ownerId] = spot;
});

const CREATE_SPOT = 'spots/create_spot';
const createSpots = (spot) => {
	return {
    type: CREATE_SPOT,
    payload: spot,
	};
}

export const spotReducer = (state = initialSpot, action) =>{

	let newState;

    switch(action.type){
        case CREATE_SPOT:{
			newState = Object.assign({}, state);
			newState.spot = action.payload;
			return newState;
        }
        default:
            return state
    }
}

export default spotReducer;

// let initialSpots = [
// 	{
// 		ownerId: 1,
// 		address: '1065 6th Ave',
// 		city: 'New York',
// 		state: 'New York',
// 		country: 'United States',
// 		lat: 40.75376,
// 		lng: -73.98496,
// 		name: '5 Bryant Park',
// 		description: 'Contemporary',
// 		price: 100,
// 	},
// 	{
// 		ownerId: 2,
// 		address: '555 E 90th St',
// 		city: 'New York',
// 		state: 'New York',
// 		country: 'United States',
// 		lat: 40.77771,
// 		lng: -73.94331,
// 		name: 'Asphalt Green UES',
// 		description: 'Antiquated',
// 		price: 100,
// 	},
// 	{
// 		ownerId: 2,
// 		address: '212 North End Ave',
// 		city: 'New York',
// 		state: 'New York',
// 		country: 'United States',
// 		lat: 40.71597,
// 		lng: -74.01475,
// 		name: 'Asphalt Green BPC',
// 		description: 'Contemporary',
// 		price: 100,
// 	},
// ]

// const initialSpot = {}

// initialSpots.forEach((spot) => {
//     initialSpot[spot.id] = spot;
// });

// const CREATE_SPOT = 'reports/create_spot';
// export const createSpots = (spot) => ({
//     type: CREATE_SPOT,
//     spot
// })

// export const spotReducer = (state = initialSpot, action) =>{
//     switch(action.type){
//         case CREATE_SPOT:{
//             const newState = {...state}
//             newState[action.spot.id] = action.spot
//             return newState
//         }
//         default:
//             return state
//     }
// }

// export default spotReducer;
