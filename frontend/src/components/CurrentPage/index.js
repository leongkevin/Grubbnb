import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import CreateSpotModal from '../CreateSpotModal';
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
					<div className="current-page-create-spot spot-thumbnail ">
						<OpenModalButton
							buttonText="+ Create a new spot"
							modalComponent={<CreateSpotModal />}
						/>
					</div>
				</div>
				<div className="grid-container current-page-grid">
					{spotComponent.map((spot) => {
						// console.log(spot.ownerId);
						if (spot.ownerId === sessionUser.id) {
							return (
								<div key={spot.id} className="spot-component">
									<NavLink
										className="spot-route"
										to={`/spots/${spot.id}`}
									>
										<div className="spot-image">
											<img
												src={spot.previewImage}
												className="spot-thumbnail"
											></img>
										</div>
										<div className="spot-details">
											<div className="spot-details-title">
												<div className="spot-city-country">
													{spot.city}, {spot.country}
												</div>
												<div className="spot-rating">
													☆{spot.avgRating}
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
				<div className="current-page-title">Authentication Required</div>
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
