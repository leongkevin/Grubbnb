import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import * as sessionActions from '../../store/session';

function ReviewFormEdit(props) {
	const dispatch = useDispatch();
	// const spot = useSelector((state) => state.spot[spotId]);
	const reviewSelector = useSelector(
		(state) => state.review[props.review.id]
	);
	const sessionUser = useSelector((state) => state.session.user);
	const [review, setReview] = useState(reviewSelector.review);
	const [stars, setStars] = useState(reviewSelector.stars);
	const [errors, setErrors] = useState([]);

	// console.log(`this is edit review props ${JSON.stringify(props)}`)

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		dispatch(
			reviewActions.updateReviewAction({
				review,
				stars,
				userId: sessionUser.id,
				spotId: props.spotId,
				id: props.review.id,
			})
		).catch(async (res) => {
			// console.log({review})
			// console.log(res)
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
		// .then(() => window.location.reload(true));
	};

	return (
		<div>
			{/* className="edit-spot-container" */}
			<form onSubmit={handleSubmit}>

				<label>
					Update Your <i class="fa-solid fa-star" />{' '}
					{props.review.stars} Review:
				</label>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<textarea
					type="text"
					// style={{ height: '100px', overflow: 'auto' }}
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
					placeholder="Review"
					className="review-profile-input review-form"
				/>
				<select
					className="review-profile-input"
					onChange={(e) => setStars(e.target.value)}
					value={stars}
				>
					<option value="">Star Rating</option>
					<option value={1}>1 Star</option>
					<option value={2}>2 Stars</option>
					<option value={3}>3 Stars</option>
					<option value={4}>4 Stars</option>
					<option value={5}>5 Stars</option>
				</select>
				<button type="submit" className="review-profile-input submit-update">
					Edit Your Review
				</button>

			</form>
		</div>
	);
}

export default ReviewFormEdit;
