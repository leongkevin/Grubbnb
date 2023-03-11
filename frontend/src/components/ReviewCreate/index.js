import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewActions from '../../store/review';
import * as sessionActions from '../../store/session';

function ReviewCreate() {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState('');
	const [errors, setErrors] = useState([]);

	const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spot[spotId]);
	// const reviewSelector = useSelector((state) => state.review);

	const handleSubmit = (e) => {
		e.preventDefault();

		setErrors([])
		//await
		dispatch(
			reviewActions.publishReview({
				review: review,
				stars: parseInt(stars),
				spotId: spot.id,
				userId: sessionUser.id,
			})
		).catch(async (res) => {
            // console.log(res)
			const data = await res.json();
			console.log(data)
			if (data && data.message) setErrors(data.message);
		})
		// .then

	};
    // console.log(`this is user ${sessionUser.id}`)
    // console.log(`this is spot params  ${spotId}`)
	return (
		<>
			<h1 className="welcome-header">
				Leave a review.
			</h1>
			<form onSubmit={handleSubmit}>
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				{errors}
				<input
					type="review"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
					placeholder="Review"
					className="profile-input"
				/>

				<select
					className="profile-input"
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

				<button type="submit" className="profile-input submit">
					Publish Review
				</button>
			</form>
		</>
	);
}

export default ReviewCreate;
