import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import OpenModalButton from '../OpenModalButton';
import './ReviewGetAll.css';

function ReviewsGetAll() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	const spotComponent = useSelector((state) => Object.values(state.spot));
	const reviewComponent = useSelector((state) => Object.values(state.review));

	useEffect(() => {
		dispatch(reviewActions.getReviewAction(spotId));
		dispatch(spotActions.getSpots(spotId));
	}, []);

	return (
		<div className="review-page-container">
			{/* <h1> {spot.avgRating} </h1> */}

			{spotComponent.map((spot) => {
				if (spot.id === parseInt(spotId)) {
					// console.log(`this is ${parseInt(spotId)}`);
					// console.log(`this is ${parseInt(spot.id)}`);
					return (
						<div>
                            <div className="review-total">
							{reviewComponent.length} Reviews
                            </div>
							<div className="review-title">
								☆ {spot.avgRating}
							</div>
						</div>
					);
				}
			})}

			{reviewComponent.map((review) => {
				return (
					<div>
						<div className="review-details">
							{review.stars} Stars - Anonymous User
							{/* {review.User.firstName} */}
							{/* error      TypeError: Cannot read properties of undefined (reading 'firstName')
    at index.js:45:1
    at Array.map (<anonymous>)
    at ReviewsGetAll (index.js:40:1)
    at renderWithHooks (react-dom.development.js:16305:1)
    at updateFunctionComponent (react-dom.development.js:19588:1)
    at beginWork (react-dom.development.js:21601:1)
    at beginWork$1 (react-dom.development.js:27426:1)
    at performUnitOfWork (react-dom.development.js:26557:1)
    at workLoopSync (react-dom.development.js:26466:1)
    at renderRootSync (react-dom.development.js:26434:1) */}
	{/* error due to firstName being undefined because */}
						</div>
						<div className="review-timestamp">
							{Date(review.updatedAt)}
						</div>
						<div className="review-review">{review.review}</div>
					</div>
				);
			})}
		</div>
	);
}

export default ReviewsGetAll;
