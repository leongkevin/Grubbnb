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
							<div className="spot-header">
								<div className="spot-title">
									<h1>{spot.name}</h1>
									<div className="spot-subtitle">
										<div className="spot-subtitle-rating">
											☆ {spot.avgRating}
										</div>
										<div className="spot-address">
											{spot.city}, {spot.state},{' '}
											{spot.country}
										</div>
										<div></div>
										<div className="spot-actions">
											<button>Edit</button>
											<button>Leave a review</button>
											<button>Edit a review</button>
                                            <DeleteSpotButton />
										</div>
									</div>
								</div>
								<div className="spot-image">
									<div className="spot-image-divider">
										<div className="spot-image-divider-left">
											<img
												src={spot.previewImage}
												className="spot-image-main"
											></img>
										</div>
										<div className="spot-image-divider-right">
											<img
												src={spot.previewImage}
												className="spot-image-secondary"
											></img>
											<img
												src={spot.previewImage}
												className="spot-image-third"
											></img>
											<img
												src={spot.previewImage}
												className="spot-image-fourth"
											></img>
											<img
												src={spot.previewImage}
												className="spot-image-fifth"
											></img>
										</div>
									</div>
								</div>
								<div className="spot-description">
									{spot.description}
								</div>
								<div className="spot-price">${spot.price}</div>
							</div>
						</div>
					);
				}
			})}
		</div>
	);
}

export default SpotPage;
