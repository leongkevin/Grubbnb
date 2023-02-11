export const getLocation = () => ({
	type: 'GET_LOCATION',
});


const initialState = {
	location: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_LOCATION':
			return {
				...state,
				location: action.payload,
			};
		default:
			return state;
	}
};

export default function getCoords(position) {
    console.log(position)
    return {
        type: 'GET_LOCATION',
        long: position.coords.longitude,
        lat: position.coords.latitude
    }
}
