import { useParams, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import './SpotPage.css';
import SpotButtonDelete from '../SpotButtonDelete';
import SpotModalEdit from '../SpotModalEdit';
import ReviewComponenet from '../ReviewComponenet';
import ReviewCreate from '../ReviewCreate';

function SpotPage() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	const spotComponent = useSelector((state) => Object.values(state.spot));
	const spotOwnerId = useSelector((state) => state.spot[spotId]);
	const sessionUser = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(spotActions.getSpots());
	}, [dispatch]);

	let spotOwnerActions = [];

	if (sessionUser) {
		spotOwnerActions = (
			<>
				{/* Have to check if spotOwnerId is a thing because it was undefined before our useEffect
            renders > useEffect hits undefined*/}
				{spotOwnerId && (
					<div className="spot-actions-edit">
						{parseInt(sessionUser.id) === spotOwnerId.ownerId && (
							<div>
								<SpotModalEdit />
								<SpotButtonDelete />
							</div>
						)}
					</div>
				)}
			</>
		);
	} else if (!sessionUser) {
		spotOwnerActions = <div id="wrapper"></div>;
	}

	return (
		<div className="spot-page-container">
			{spotComponent.map((spot) => {
				// console.log(`this is userId: ${sessionUser.id}`)
				// console.log(`this is line 26: ${spotId} === ${spot.id}`)
				let rating = spot.avgRating;
				if (rating === null) {
					// console.log(rating)
					rating = 'none';
				}
				// console.log(parseInt(spotId) === spot.id)
				// console.log(parseInt(spotId) === spot.id)
				if (parseInt(spotId) === spot.id) {
					return (
						<div key={spot.id} className="spot-page-result">
							<div className="spot-header">
								<div className="spot-title">
									{spot.name}
									<div className="spot-subtitle">
										<div className="spot-subtitle-rating">
											<i class="fa-solid fa-star" />{' '}
											{rating}
										</div>
										<div>·</div>
										<div className="spot-address">
											{spot.city}, {spot.state},{' '}
											{spot.country}
										</div>
									</div>
								</div>
								<div className="spot-image">
									<div className="spot-image-divider">
										<div className="spot-image-divider-left">
											{/* <NavLink to={{ pathname: spot.previewImage }} target="_blank"> */}
											<img
												src={spot.previewImage}
												className="spot-image-main"
											></img>
											{/* </NavLink> */}
										</div>
										<div className="spot-image-divider-right">
											<img
												src={spot.previewImage}
												// src="https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720"
												className="spot-image-secondary"
											></img>
											<img
												src={spot.previewImage}
												className="spot-image-third"
											></img>
											<img
												src={spot.previewImage}
												// src="https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720"
												className="spot-image-fourth"
											></img>
											<img
												src={spot.previewImage}
												className="spot-image-fifth"
											></img>
										</div>
									</div>
								</div>
								<div className="spot-page-details">
									<div className="spot-page-details-left">
										{' '}
										Entire home hosted by ownerId:{' '}
										{spot.ownerId}
										<hr />
										<img
											src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
											width="30%"
										/>
										<div>
											Every booking includes free
											protection from Host cancellations,
											listing inaccuracies, and other
											issues like trouble checking in.
										</div>
										<hr />
										<div className="spot-description">
											{spot.description}
										</div>
										<hr />
									</div>
									<div className="spot-page-details-right">
										<div className="spot-actions">
											{spotOwnerActions}
										</div>
									</div>
								</div>
								<hr />
								<ReviewComponenet />
							</div>
						</div>
					);
				}
			})}
		</div>
	);
}

export default SpotPage;
