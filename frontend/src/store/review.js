import { csrfFetch } from './csrf';

const initialState = {};

const GET_REVIEWS = 'spots/GET_REVIEWS';
export const getAllReviews = (reviews) => {
	// console.log(reviews);
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

const UPDATE_REVIEW = 'review/UPDATE_REVIEW';
export const editReview = (reviewId) => ({
	type: UPDATE_REVIEW,
	payload: reviewId,
});

const REMOVE_REVIEW = 'review/REMOVE_REVIEW';
export const removeReview = (reviewId) => ({
	type: REMOVE_REVIEW,
	payload: reviewId,
});

const reviewReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_REVIEWS: {
			const newState = {};
			// console.log(`This is review ${action.payload}`);
			action.payload.Reviews.forEach((review) => {
				newState[review.id] = review;
			});
			return newState;
		}

		case CREATE_REVIEW: {
			const newState = { ...state };
			// newState[action.spot.id] = action.spot;
			// console.log(newState[action.spot])
			// console.log(`This is review ${action.payload}`);
			newState[action.payload.id] = action.payload;
			// console.log(newState[action.spot])
			return newState;
		}

		case UPDATE_REVIEW: {
			const newState = {
				...state,
				...action.payload,
			};
			return newState;
		}

		case REMOVE_REVIEW: {
			const newState = { ...state };
			// console.log(`${action.reviewId}`);
			delete newState[action.reviewId];
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

// export const publishReview = (spotId, review, stars) => async (dispatch) => {
export const publishReview = (data, review, stars) => async (dispatch) => {
	// console.log(review);
	// const { spotId } = review;
	// const { review, stars } = review;
	// console.log(spotId)
	// console.log({spotId})
	// console.log({data})
	// console.log({review})
	// console.log({stars})
	const response = await csrfFetch(`/api/spots/${data.spotId}/reviews`, {
		// const response = await csrfFetch(`/api/spots/2/reviews`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			review: data.review,
			stars: data.stars,
		}),
	});
	console.log(response);
	const newReview = await response.json();
	dispatch(createReview(newReview));
	return newReview;
};

export const updateReviewAction = (reviewId) => async (dispatch) => {
	// console.log( reviewId[reviewId] );
	// const response = await csrfFetch(`/api/reviews/${reviewId.id}`, {
	// { ${review[31].id}

	const response = await csrfFetch(`/api/reviews/12`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			// review: review.review,
			// stars: parseInt(review.stars),
			review: reviewId.review,
			stars: parseInt(reviewId.stars),
		}),
	});
	const newReview = await response.json(response);
	dispatch(editReview(newReview));
	return newReview;


};

// export const updateReviewAction = (review) => async (dispatch) => {
// 	return async dispatch => {
// 		const response = await csrfFetch(`/api/reviews/12`, {
// 			// { ${review[31].id}

// 			// const response = await csrfFetch(`/api/reviews/12`, {
// 				method: 'PUT',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify({
// 					review: review.review,
// 					stars: parseInt(review.stars),
// 				}),
// 			});

// 			const newReview = await response.json(response);
// 			editReview(newReview)
// 			console.log(newReview)
// 			return newReview;
// 		}
//    }

export const deleteReviewAction = (reviewId) => async (dispatch) => {
	const response = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: 'DELETE',
	});
	const review = await response.json();
	dispatch(removeReview(reviewId));
	return review;
};


export default reviewReducer;
