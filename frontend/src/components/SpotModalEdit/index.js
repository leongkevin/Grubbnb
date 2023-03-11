import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';

function SpotModalEdit() {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector((state) => state.spot[spotId]);
	const [name, setName] = useState(spot.name);
	const [description, setDescription] = useState(spot.description);
	const [price, setPrice] = useState(spot.price);
	const [errors, setErrors] = useState([]);
	const [updatedAt, setUpdatedAt] = useState(spot.updatedAt);
	const history = useHistory();
	const [hasSubmitted, setHasSubmitted] = useState(false);

	const sessionUser = useSelector((state) => state.session.user);
	const spotComponent = useSelector((state) => Object.values(state.spot));

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		dispatch(
			spotActions.updateSpotAction({
				address: spot.address,
				city: spot.city,
				state: spot.state,
				country: spot.country,
				lat: spot.lat,
				lng: spot.lng,
				name,
				description,
				price,
				id: spotId,
			})
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});
		if(!errors){
			history.push(`/spots/current`)
		}

	};

	return (
		<>
			<div className="edit-spot-container">
				<form onSubmit={handleSubmit}>
					<div className="spot-greeting">
						Welcome back, {sessionUser.firstName}
					</div>
					{spotComponent.map((spot) => {
						const timestamp = updatedAt; // Replace this with your own timestamp
						const date = new Date(timestamp); // Creates a new Date object from the timestamp

						const options = {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
							timeZone: 'America/New_York',
							timeZoneName: 'short',
						};
						const newFormat = date.toLocaleDateString(
							'en-US',
							options
						);

						if (parseInt(spotId) === spot.id) {
							return (
								<>
									<div className="spot-timestamp">
										Last updated on {newFormat}
									</div>
								</>
							);
						}
					})}

						{errors.map((error, idx) => (
							<div className="spot-errors" key={idx}>{error}</div>
						))}


					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						placeholder="Name"
						className="profile-input"
					/>

					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
						placeholder="Description"
						className="profile-input"
					/>

					<input
						type="decimal"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
						placeholder="Price"
						className="profile-input"
					/>



					<button type="submit" className="profile-input submit">
						{spotComponent.map((spot) => {
							if (parseInt(spotId) === spot.id) {
								return (
									<>
										<div className="spot-owner-action-button">
											Publish Changes to {spot.name}
										</div>
									</>
								);
							}
						})}
					</button>
				</form>
			</div>
		</>
	);
}

export default SpotModalEdit;
