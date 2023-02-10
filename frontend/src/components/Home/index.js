import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';
import './Home.css'

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
						<NavLink className="spot-route" to={`/spots/${spot.id}`}>
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

			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/63787420-6a55-4d88-b459-c65d0251ba31.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/63787420-6a55-4d88-b459-c65d0251ba31.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-53417893/original/63787420-6a55-4d88-b459-c65d0251ba31.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/d990acce-13ea-4de9-9f2d-6627b04a5601.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-21409981/original/a8fa243d-dac8-4238-93e5-f7aa33072ff8.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
			<div className="spot-component">
				<div className="spot-image">
					<img
						src="https://a0.muscache.com/im/pictures/miso/Hosting-673753152039498122/original/b279ff57-201a-4990-9d47-69314a7213d2.jpeg?im_w=720"
						className="spot-thumbnail"
					></img>
				</div>
				<div className="spot-address">New York, NY</div>
				<div className="spot-description">The best house ever</div>
				<div className="spot-price">$199</div>
			</div>
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
