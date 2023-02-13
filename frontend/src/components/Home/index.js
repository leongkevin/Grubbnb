import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import './Home.css';

function Home() {
	const dispatch = useDispatch();

	const spotComponent = useSelector((state) => Object.values(state.spot));

	useEffect(() => {
		dispatch(spotActions.getSpots());
	}, []);



	return (
		<div className="grid-container">
			{spotComponent.map((spot) => {
			let rating = spot.avgRating;
			if(rating === null) {
				// console.log(rating)
				rating = "none"
			}
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
										☆{rating}
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
			})}
		</div>
	);
}

export default Home;

// change logo
// make can't click for grubhub home
// create when you're logged in, deleting, updating, displaying spots
// switch reviews, reviews-images
// today tomorrow finish spots,
// reviews,
// ideally a full row
