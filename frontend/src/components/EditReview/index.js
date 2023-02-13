import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import * as sessionActions from '../../store/session';

function EditReview() {
	const dispatch = useDispatch();
	const { spotId, reviewId } = useParams();
	// const spot = useSelector((state) => state.spot[spotId]);
    const reviewSelector = useSelector((state) => state.review[reviewId]);
    const sessionUser = useSelector((state) => state.session.user);
	const [review, setReview] = useState('');
	const [stars, setStars] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		dispatch(
			reviewActions.updateReviewAction({
				review,
				stars,
				userId: sessionUser.id,
				spotId: parseInt(spotId),
			})
		)
			.catch(async (res) => {
                // console.log({review})
                // console.log(res)
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			})
			// .then(() => window.location.reload(true));
	};

	return (
		<>
			<div >
                {/* className="edit-spot-container" */}
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<h1 className="welcome-header">
                    Edit your review
					</h1>

					<input
						type="text"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						required
						placeholder="Review"
						// className="profile-input"
					/>

					<select
						// className="profile-input"
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

					<button type="submit" >
                    {/* className="profile-input submit" */}
						Edit Review
					</button>
				</form>
			</div>
		</>
	);
}

export default EditReview;
