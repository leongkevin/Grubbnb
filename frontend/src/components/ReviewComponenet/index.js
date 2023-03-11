import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import OpenModalButton from '../OpenModalButton';
import './ReviewGetAll.css';
import ReviewFormEdit from '../ReviewFormEdit';
import DeleteReview from '../ReviewButtonDelete';
import ReviewCreate from '../ReviewCreate';

function ReviewComponenet() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	let myReview = 0;

	const spotComponent = useSelector((state) => Object.values(state.spot));
	const reviewComponent = useSelector((state) => Object.values(state.review));
	// const reviewMyReview = useSelector((state) => state.review[23]);
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
		dispatch(reviewActions.deleteReviewAction(myReview))
			// .then(() => history.push("/"))
			// .then(() => window.location.reload(true));
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

	// console.log(sessionUser)

	let sessionLinks;

	if (sessionUser) {
		sessionLinks = (
			<div id="review-box">
				<ReviewCreate />
			</div>
		);
	}

	let count = 0;

	return (
		<div className="review-page-container">
			<div className="review-box">
				{spotComponent.map((spot) => {
					if (spot.id === parseInt(spotId)) {
						// console.log(`this is ${parseInt(spotId)}`);
						// console.log(`this is ${parseInt(spot.id)}`);
						return (
							<div>
								<div className="review-total"></div>
								<div className="review-title">
									<i class="fa-solid fa-star" />{' '}
									{spot.avgRating} · {reviewComponent.length}{' '}
									Reviews
								</div>
							</div>
						);
					}
				})}

				{reviewComponent.map((currReview) => {
					// console.log(currReview);
					// console.log(
					// 	sessionUser &&
					// 		sessionUser.id === parseInt(currReview.userId)
					// );

					count += 1;
					console.log(reviewComponent.length)
					console.log(count)
					if (
						sessionUser &&
						sessionUser.id === parseInt(currReview.userId)
					) {
						return (
							<div className="review-box">
								<ReviewFormEdit review={currReview} />
								<button
									onClick={deleteReview}
									className="profile-input delete-review"
								>
									Delete Your Review
								</button>
							</div>
						);
					} else if(sessionUser && reviewComponent.length === count) {
						return (
							<div className="review-box">
								{sessionLinks}
							</div>
						);
					}
				})}
			</div>
			{reviewComponent.map((currentReview) => {
				myReview = parseInt(currentReview.id);
				// if (!sessionUser && currentReview.id) {

				// console.log(`this is ${currentReview.id} vs ${undefined}: ${currentReview.id !== undefined}`)
				// console.log(parseInt(currentReview.userId) === parseInt(sessionUser.id))
				// if ((currentReview.id !== undefined)) {
				// console.log(sessionUser)

				// if(sessionUser) {
				// 	sessionUser.id = 0;
				// }
				// if ((parseInt(currentReview.userId))) { //  === parseInt(sessionUser.id)
				// if ((parseInt(currentReview.userId))) { //  === parseInt(sessionUser.id)
				if (
					sessionUser &&
					sessionUser.id === parseInt(currentReview.userId)
				) {
					// if ((currentReview.id !== undefined) && (parseInt(currentReview.userId) === parseInt(sessionUser.id))) {

					return (
						<>
							<div className="review-box">
								<div className="review-details">
									<i class="fa-solid fa-star" />{' '}
									{currentReview.stars} · Your Review
									{/* {currentReview.User.firstName} */}
								</div>
								<div className="review-timestamp">
									{Date(currentReview.updatedAt)}
								</div>
								<div className="review-review">
									{currentReview.review}
								</div>
								{/* <EditReview review={currentReview} /> */}
								{/* {reviewComponent.map((currReview) => {
									console.log(currReview);
									console.log(
										sessionUser &&
											sessionUser.id ===
												parseInt(currReview.userId)
									);

									if (
										sessionUser &&
										sessionUser.id ===
											parseInt(currReview.userId)
									) {
										return (
											<div  className="review-box" >
												<ReviewFormEdit
													review={currReview}
												/>
												<button
													onClick={deleteReview}
													className="profile-input delete-review"
												>
													Delete Your Review
												</button>
											</ div>
										);
									}
								})} */}
							</div>
						</>
					);
				} else {
					return (
						<div className="review-box">
							<div className="review-details">
								<i class="fa-solid fa-star" />{' '}
								{currentReview.stars} ·{' '}
								{currentReview.User.firstName}
							</div>
							<div className="review-timestamp">
								{Date(currentReview.updatedAt)}
							</div>
							<div className="review-review">
								{currentReview.review}
							</div>
						</div>
					);
				}
			})}
			{/* {reviewComponent.map((currReview) => {
				console.log(currReview);
				console.log(
					sessionUser &&
						sessionUser.id === parseInt(currReview.userId)
				);

				if (
					sessionUser &&
					sessionUser.id === parseInt(currReview.userId)
				) {
					return (
						<div className="review-box">
							<ReviewFormEdit review={currReview} />
							<button
								onClick={deleteReview}
								className="profile-input delete-review"
							>
								Delete Your Review
							</button>
						</div>
					);
				}
			})} */}
		</div>
	);
}

export default ReviewComponenet;
