import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import SpotModalCreate from '../SpotModalCreate';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as spotActions from '../../store/spot';
import * as sessionActions from '../../store/session';
import './CurrentPage.css';

function Hosting() {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);

	const spotComponent = useSelector((state) => Object.values(state.spot));
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(spotActions.getSpots());
	}, []);
	if (sessionUser) {
		return (
			<>
				<div className="current-page-title">Manage Your Spots</div>
				<div className="current-page-menu">
					<div className="current-page-create-spot">
						<OpenModalButton
							buttonText="+ Create a new spot"
							modalComponent={<SpotModalCreate />}
						/>
					</div>
				</div>
				<div className="grid-container current-page-grid">
					{spotComponent.map((spot) => {
						// console.log(spot.ownerId);
						let rating = spot.avgRating;
						if (rating === null) {
							rating = '';
							// const el = document.querySelector(".spot-rating")
							// el.classList.add('display-none')
						}

						if (rating === null) {
							return(
								<>
									<i class="fa-solid fa-star" />
								</>
							)
						}

						let mainImage = [spot.previewImage];
						console.log(`mainImage ${mainImage}`);
						if (!mainImage.length) {
							mainImage =
								'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';
						} else {
							mainImage = spot.previewImage;
						}

						if (spot.ownerId === sessionUser.id) {
							return (
								<div key={spot.id} className="spot-component">
									<NavLink
										className="spot-route"
										to={`/spots/${spot.id}`}
									>
										<div className="spot-image">
											<img
												src={mainImage}
												className="spot-thumbnail"
											></img>
										</div>
										<div className="spot-details">
											<div className="spot-details-title">
												<div className="spot-city-country">
													{spot.city}, {spot.country}
												</div>
												<div className="spot-rating">
													<i class="fa-solid fa-star" />{' '}
													{rating}
													{/* {spot.rating} */}
												</div>
											</div>
											<div className="spot-description">
												{spot.description}
											</div>
											<div className="spot-price">
												${spot.price} night
											</div>
										</div>
									</NavLink>
								</div>
							);
						}
					})}
				</div>
			</>
		);
	} else {
		return (
			<>
				<div className="current-page-title">
					Authentication Required
				</div>
				<div className="current-page-menu">
					<div className="current-page-create-spot spot-thumbnail ">
						<OpenModalButton
							buttonText=" Login to Grubbnb"
							modalComponent={<LoginFormModal />}
						/>
					</div>
					<div className="or-div">or</div>
					<div className="current-page-create-spot spot-thumbnail ">
						<OpenModalButton
							buttonText="Sign up for Grubbnb"
							modalComponent={<SignupFormModal />}
						/>
					</div>
				</div>
			</>
		);
	}
}

export default Hosting;
