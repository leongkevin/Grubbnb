import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import OpenModalButton from '../OpenModalButton';
import './ReviewGetAll.css';
import EditReview from '../EditReview';

function ReviewsGetAll() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	let myReview = 0;

	const spotComponent = useSelector((state) => Object.values(state.spot));
	const reviewComponent = useSelector((state) => Object.values(state.review));
	const reviewMyReview = useSelector((state) => state.review[23]);
	console.log(`This is rc: ${JSON.stringify(reviewMyReview)}`)

	const sessionUser = useSelector((state) => state.session.user);
	// const reviewSelector = useSelector((state) => state.review[reviewId]);

	const [review, setReview] = useState(reviewComponent.review);
	const [stars, setStars] = useState(reviewComponent.stars);
	const [errors, setErrors] = useState([]);

	const history = useHistory();



	const deleteReview = async (e) => {
		e.preventDefault();
		// console.log(reviewId)
		// dispatch(reviewActions.deleteReviewAction(spotId))
		dispatch(reviewActions.deleteReviewAction(myReview))
		// dispatch(reviewActions.deleteReviewAction(10))
		// .then(() => history.push("/"))
		.then(() => window.location.reload(true));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		// console.log({myReview})
		console.log(`this is reviewcomp ${review}`)
		console.log(`this is stars ${stars}`)
		dispatch(
			reviewActions.updateReviewAction({
				review,
				stars,
				userId: sessionUser.id,
				spotId: parseInt(spotId),
				id: myReview,
			})
		).catch(async (res) => {
			// console.log({review})
			// console.log(res)
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		})
		// .then(() => window.location.reload(true));
	};

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

			{reviewComponent.map((currentReview) => {

				myReview = parseInt(currentReview.id);
				// console.log(`this is it ${review.id}`);
				// console.log(`this is it myReview ${myReview}`);
				if (parseInt(currentReview.userId) === parseInt(sessionUser.id)) {
					return (
						<>
						Your Review: {currentReview.stars} Stars
						<div>{currentReview.review}</div>


						<div>
				{/* className="edit-spot-container" */}
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<h1 className="welcome-header">Edit your review</h1>

					<input
						type="text"
						value={currentReview.review}
						onChange={(e) => setReview(e.target.value)}
						required
						placeholder="Review"
						// className="profile-input"
					/>

					{/* <input
						type="number"
						value={stars}
						onChange={(e) => setStars(e.target.value)}
						required
						placeholder="Stars"
						// className="profile-input"
					/> */}

					<select
						// className="profile-input"
						onChange={(e) => setStars(e.target.value)}
						value={currentReview.stars}
					>
						<option value="">Star Rating</option>
						<option value={1}>1 Star</option>
						<option value={2}>2 Stars</option>
						<option value={3}>3 Stars</option>
						<option value={4}>4 Stars</option>
						<option value={5}>5 Stars</option>
					</select>

					<button type="submit">
						{/* className="profile-input submit" */}
						Edit Review
					</button>
				</form>
			</div>


							<button
								onClick={deleteReview}
								// className="profile-input submit"
							>
								Delete Review
							</button>
						</>
					);
				} else {
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
				}
			})}
		</div>
	);
}

export default ReviewsGetAll;
