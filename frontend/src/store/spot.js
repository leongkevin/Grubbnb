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
