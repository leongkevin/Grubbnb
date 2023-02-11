import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import CreateSpotModal from '../CreateSpotModal';
import OpenModalButton from '../OpenModalButton';
import * as spotActions from '../../store/spot';


function Hosting() {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);

	const spotComponent = useSelector((state) => Object.values(state.spot));

	useEffect(() => {
		dispatch(spotActions.getSpots());
	}, []);

	return (
		<>
									<h1>Manage Your Spots</h1>
			<OpenModalButton
				buttonText="Create a new listing"
				modalComponent={<CreateSpotModal />}
			/>

<div className="grid-container">
			{spotComponent.map((spot) => {
				return (

					<div key={spot.id} className="spot-component">
									<h1>Manage Your Spots</h1>
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
								<div className="spot-price">${spot.price} night</div>
							</div>
						</NavLink>
					</div>
				);
			})}
		</div>
		</>
	);
}

export default Hosting;
