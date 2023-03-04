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
			if (data && data.errors) setErrors(data.errors);
		});
		history.push(`/spots/current`);

		const timestamp = updatedAt; // Replace this with your own timestamp

		const date = new Date(timestamp); // Creates a new Date object from the timestamp

		console.log(date.toDateString()); // Outputs the date in a human-readable format (e.g. "Tue May 25 2021")
	};

	return (
		<>
			<div className="edit-spot-container">
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<h1 className="welcome-header">
						Welcome back, {spot.ownerId}
					</h1>
					<h7 className="welcome-header">
						{/* Last updated at {spot.updatedAt.toDateString()} */}
						Last updated at {spot.date}





























					</h7>
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
						Publish Changes For Spot Id # {spotId}
					</button>
				</form>
			</div>
		</>
	);
}

export default SpotModalEdit;
