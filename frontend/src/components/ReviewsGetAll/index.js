import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import OpenModalButton from '../OpenModalButton';

function ReviewsGetAll() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	const reviewComponent = useSelector((state) =>
		//  state.review
		Object.values(state.review)
	);

	useEffect(() => {
		dispatch(reviewActions.getReviewAction(spotId));
	}, []);

	return (
		<div className="review-page-container">
			<h1>Reviews below</h1>
			{reviewComponent.map((review) => {
				return (
					<h1>
						Reviews: {review.review}, {review.stars}
					</h1>
				);
			})}
		</div>
	);
}

export default ReviewsGetAll;
