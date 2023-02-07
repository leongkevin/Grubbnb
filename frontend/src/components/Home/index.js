import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getAllSpots } from "../../store/spot";
// import defaultImage from "../../img/default-image.webp";

function Home() {
	return (
		<div className="grid-container">
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
		</div>
	);
}

export default Home;
