import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';


function EditSpotModal() {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const spot = useSelector((state) => state.spot[spotId]);
	const [name, setName] = useState(spot.name);
	const [description, setDescription] = useState(spot.description);
	const [price, setPrice] = useState(spot.price);
	const [errors, setErrors] = useState([]);

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
		)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			})
			.then(() => window.location.reload(true));
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
					Publish Edits For Spot Id # {spotId}
					</h1>


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
						Edit Spot
					</button>
				</form>
			</div>
		</>
	);
}

export default EditSpotModal;
