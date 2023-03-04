import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';

import * as reviewActions from '../../store/review';


const ReviewButtonDelete = () => {
	const dispatch = useDispatch();
	const { reviewId } = useParams();
	const history = useHistory();


	const deleteReview = async (e) => {
		e.preventDefault();
		// console.log(reviewId)
		// dispatch(reviewActions.deleteReviewAction(spotId))
		dispatch(reviewActions.deleteReviewAction(1000))
		// dispatch(reviewActions.deleteReviewAction(10))
		// .then(() => history.push("/"))
		// .then(() => window.location.reload(true));
	};

	return (
		<div>
			{/* <button onClick={deleteReview}
			// className="profile-input submit"

			>Delete Review</button> */}
		</div>
	);
};

export default ReviewButtonDelete;
