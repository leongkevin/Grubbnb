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
		)
			.catch(async (res) => {
				// console.log({review})
				// console.log(res)
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			})
			.then(() => window.location.reload(true));
	};

	return (
		<div>
			{/* className="edit-spot-container" */}
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<div className="review-page-container">
					<div className="welcome-header">
						Update your <i class="fa-solid fa-star" />{' '}
						{props.review.stars} review
					</div>
				</div>
				<label>Your Review:</label>
				<input
					type="text"
					value={review}
					onChange={(e) => setReview(e.target.value)}
					required
					placeholder="Review"
					className="profile-input"
				/>
				<label>Your Rating:</label>
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
					Edit Your Review
				</button>
			</form>
		</div>
	);
}

export default ReviewFormEdit;

{
	/*
// {reviewComponent.map((currentReview) => {
//     myReview = parseInt(currentReview.id);
//     // console.log(`this is it ${review.id}`);
//     // console.log(`this is it myReview ${myReview}`);
//     if (
//         parseInt(currentReview.userId) === parseInt(sessionUser.id)
//     ) {
//         return (
//             <>
//                 Your Review: {currentReview.stars} Stars
//                 <div>{currentReview.review}</div>
//                 <div>
//                     {/* className="edit-spot-container" */
}
//                     <form onSubmit={handleSubmit}>
//                         <ul>
//                             {errors.map((error, idx) => (
//                                 <li key={idx}>{error}</li>
//                             ))}
//                         </ul>
//                         <h1 className="welcome-header">
//                             Edit your review
//                         </h1>

//                         <input
//                             type="text"
//                             value={currentReview.review}
//                             onChange={(e) =>
//                                 setReview(e.target.value)
//                             }
//                             required
//                             placeholder="Review"
//                             // className="profile-input"
//                         />

//                         {/* <input
//             type="number"
//             value={stars}
//             onChange={(e) => setStars(e.target.value)}
//             required
//             placeholder="Stars"
//             // className="profile-input"
//         /> */}

//                         <select
//                             // className="profile-input"
//                             onChange={(e) =>
//                                 setStars(e.target.value)
//                             }
//                             value={currentReview.stars}
//                         >
//                             <option value="">Star Rating</option>
//                             <option value={1}>1 Star</option>
//                             <option value={2}>2 Stars</option>
//                             <option value={3}>3 Stars</option>
//                             <option value={4}>4 Stars</option>
//                             <option value={5}>5 Stars</option>
//                         </select>

//                         <button type="submit">
//                             {/* className="profile-input submit" */}
//                             Edit Review
//                         </button>
//                     </form>
//                 </div>
//                 <button
//                     onClick={deleteReview}
//                     // className="profile-input submit"
//                 >
//                     Delete Review
//                 </button>
//             </>
//         );
//  */}

// {reviewComponent.map((currentReview) => {
//     return(
//         <>
//         <EditReview review={currentReview} />;
//         </>

//     )

// })}

// {
//     return (
//         <div>
//             <div className="review-details">
//                 {review.stars} Stars - Anonymous User
//                 {/* {review.User.firstName} */}
//                 {/* error      TypeError: Cannot read properties of undefined (reading 'firstName')
// at index.js:45:1
// at Array.map (<anonymous>)
// at ReviewsGetAll (index.js:40:1)
// at renderWithHooks (react-dom.development.js:16305:1)
// at updateFunctionComponent (react-dom.development.js:19588:1)
// at beginWork (react-dom.development.js:21601:1)
// at beginWork$1 (react-dom.development.js:27426:1)
// at performUnitOfWork (react-dom.development.js:26557:1)
// at workLoopSync (react-dom.development.js:26466:1)
// at renderRootSync (react-dom.development.js:26434:1) */}
//                 {/* error due to firstName being undefined because */}
//             </div>
//             <div className="review-timestamp">
//                 {Date(review.updatedAt)}
//             </div>
//             <div className="review-review">{review.review}</div>
//         </div>
//     );
// }
// })}
// </div>

// myReview = parseInt(currentReview.id);
