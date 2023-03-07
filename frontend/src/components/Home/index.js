import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import './Home.css';

function Home() {
	const dispatch = useDispatch();


	// const [showMenu, setShowMenu] = useState(false);
	// const ulRef = useRef();
	// useEffect(() => {
	// 	if (!showMenu) return;

	// 	const closeMenu = (e) => {
	// 		if (!ulRef.current.contains(e.target)) {
	// 			setShowMenu(false);
	// 		}
	// 	};

	// 	document.addEventListener('click', closeMenu);

	// 	return () => document.removeEventListener('click', closeMenu);
	// }, [showMenu]);

	// const ulClassName = 'spot-rating' + (showMenu ? '' : ' display-none');





	const spotComponent = useSelector((state) => Object.values(state.spot));

	useEffect(() => {
		dispatch(spotActions.getSpots());
	}, []);

	return (
		<div className="grid-container">
			{spotComponent.map((spot) => {
				let rating = spot.avgRating;
				if (rating === null) {
					rating = '+';
					// const el = document.querySelector(".spot-rating")
					// el.classList.add('display-none')
				}

				// if (rating === null) {
				// 	return(
				// 		<>
				// 			<i class="fa-solid fa-star" />
				// 		</>
				// 	)
				// }

				let mainImage = [spot.previewImage];
				console.log(`mainImage ${mainImage}`);
				if (!spot.previewImage) {
					mainImage =
						'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png';
				} else {
					mainImage = spot.previewImage;
				}
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
									<div className="spot-rating"><i class="fa-solid fa-star" /> {rating}

									</div>
									{/* <div className={ulClassName} ref={ulRef}><i class="fa-solid fa-star" /> {rating}
									</div> */}
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
