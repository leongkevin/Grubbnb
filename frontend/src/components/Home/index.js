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
								<div className="spot-address">
									{spot.city}, {spot.country}
								</div>
								<div className="spot-rating">
									☆ {spot.avgRating}
								</div>
								<div className="spot-description">
									{spot.description}
								</div>
								<div className="spot-price">${spot.price}</div>
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
