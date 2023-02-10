import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import './SpotPage.css';
import DeleteSpotButton from '../DeleteSpotButton';

function SpotPage() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	const spotComponent = useSelector((state) => Object.values(state.spot));

	useEffect(() => {
		dispatch(spotActions.getSpots());
	}, []);

	return (
		<div className="spot-page-container">
			{spotComponent.map((spot) => {
				// console.log(`this is line 26: ${spotId} === ${spot.id}`)
				if (parseInt(spotId) === spot.id) {
					return (
						<div key={spot.id} className="spot-page-result">
							<h1>Grubbnb</h1>

							{/* <NavLink className="spot-route" to={`/spots/${spot.id}`}> */}
							<div className="spot-image">
								<img
									src={spot.previewImage}
									className="spot-image-main"
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
							{/* </NavLink> */}
						</div>
					);
				}
			})}

			<div className="spot-page-container">
				<DeleteSpotButton />
				<h3>This is {spotId}</h3>
			</div>
		</div>
	);
}

export default SpotPage;
