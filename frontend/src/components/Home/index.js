import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
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
				let ratings = spot.avgRating;
				if (!ratings) {
					ratings = null;
					// const el = document.querySelectorAll(".spot-rating")
					// el.forEach((element) =>

					// console.log(`Hello ${element.classList.add('display-none')}`)

					// )
					// el.classList.add('display-none')
				} else if (!(ratings % 1 === 0 )) {
					let newNum = ratings;
					// console.log(typeof newNum);
					// console.log(newNum.toFixed(2))
					ratings = newNum.toFixed(2);
				}

				let mainImage = [spot.previewImage];
				// console.log(`mainImage ${mainImage}`);
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
									<div className="spot-rating">
										<i class="fa-solid fa-star" /> {ratings}
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
