import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import OpenModalButton from '../OpenModalButton';
import './ReviewGetAll.css';
import EditReview from '../EditReview';
import DeleteReview from '../ReviewButtonDelete';

function ReviewComponenet() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	let myReview = 0;

	const spotComponent = useSelector((state) => Object.values(state.spot));
	const reviewComponent = useSelector((state) => Object.values(state.review));
	const reviewMyReview = useSelector((state) => state.review[23]);
	// console.log(`This is rc: ${JSON.stringify(reviewMyReview)}`);

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
		// console.log(`this is reviewcomp ${review}`);
		// console.log(`this is stars ${stars}`);
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
		});
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

							</div>
							<div className="review-title">
								<i class="fa-solid fa-star" /> {spot.avgRating}{' '}·{' '}{reviewComponent.length} Reviews
							</div>
						</div>
					);
				}
			})}
			<div>
				<button
					onClick={deleteReview}
					className="review-component submit"
				>
					Delete Your Review
				</button>
			</div>
			{reviewComponent.map((currentReview) => {
				myReview = parseInt(currentReview.id);
				// if (!sessionUser && currentReview.id) {

				console.log(`this is ${currentReview.id} vs ${undefined}: ${currentReview.id !== undefined}`)
				// console.log(parseInt(currentReview.userId) === parseInt(sessionUser.id))
				// if ((currentReview.id !== undefined)) {
					if ((parseInt(currentReview.userId) === parseInt(sessionUser.id))) {
					// if ((currentReview.id !== undefined) && (parseInt(currentReview.userId) === parseInt(sessionUser.id))) {
					return (
						<>
							<div>
								<div className="review-details">
									{currentReview.stars} Stars - Anonymous User
									{currentReview.User.firstName} Stars -
									Anonymous User
								</div>
								<div className="review-timestamp">
									{Date(currentReview.updatedAt)}
								</div>
								<div className="review-review">
									{currentReview.review}
								</div>
							</div>
						</>
					);
				}
				// } else if (

				// parseInt(currentReview.id) !== parseInt(sessionUser.user.id)
				// )
				else if(parseInt(currentReview.userId) === parseInt(sessionUser.id)) {
					return (
						<div>
							<div className="review-details">
								<i class="fa-solid fa-star" />{' '}
								{currentReview.stars}{' '}·{' '}
								{currentReview.User.firstName}
							</div>
							<div className="review-timestamp">
								{Date(currentReview.updatedAt)}
							</div>
							<div className="review-review">
								{currentReview.review}
							</div>
							{reviewComponent.map((currReview) => {
								if (
									currReview.userId ===
									parseInt(sessionUser.id)
								) {
									return (
										<>
											<EditReview review={currReview} />
										</>
									);
								}
							})}
						</div>
					);
					{
						reviewComponent.map((currReview) => {
							if (
								currReview.userId === parseInt(sessionUser.id)
							) {
								return (
									<>
										<EditReview review={currReview} />
									</>
								);
							}
						});
					}
				}
			})}
		</div>
	);
}

export default ReviewComponenet;
