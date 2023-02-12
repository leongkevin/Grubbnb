import { csrfFetch } from './csrf';

const initialState = {};

const GET_REVIEWS = 'spots/GET_REVIEWS';
export const getAllReviews = (reviews) => {
	console.log(reviews);
	return {
		type: GET_REVIEWS,
		payload: reviews,
	};
};

const CREATE_REVIEW = 'review/CREATE_REVIEW';
export const createReview = (review) => {
	return {
		type: CREATE_REVIEW,
		payload: review,
	};
};

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEWS: {
			const newState = {};
			console.log(`This is ${action.payload}`);
			action.payload.Reviews.forEach((review) => {
				newState[review.id] = review;
			});
			return newState;
		}

		case CREATE_REVIEW: {
			const newState = { ...state };
			// newState[action.spot.id] = action.spot;
			// console.log(newState[action.spot])
			newState[action.payload.id] = action.payload;
			// console.log(newState[action.spot])
			return newState;
		}

		default:
			return state;
	}
};

export const getReviewAction = (spotId) => async (dispatch) => {
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
	const reviews = await response.json();
	dispatch(getAllReviews(reviews));
	return response;
};

export const publishReview = (review) => async (dispatch) => {
	console.log(review);
	const { spotId } = review;
	const { review, stars } = review;
	const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			review,
			stars,
		}),
	});
	const newReview = await response.json(response);
	dispatch(createReview(newReview));
	return newReview.id;
};

export default reviewReducer;
