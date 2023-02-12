import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spot';
import './ReviewsCreateModal.css';

function ReviewsCreateModal() {
	const dispatch = useDispatch();
	const { spotId } = useParams();

	const [review, setAddress] = useState('');
	const [star, setCity] = useState('');
	const [spot, setSpot] = useState(spotId);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
			setErrors([]);
			dispatch(
				spotActions.publishSpot({
					review,
					star,
					spot
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
	};

	return (
		<>
			<h1 className="welcome-header">Welcome to Grubbnb</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<input
					type="text"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					required
					placeholder="Address"
					className="profile-input"
				/>
				<input
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					required
					placeholder="City"
					className="profile-input"
				/>
				<input
					type="text"
					value={state}
					onChange={(e) => setState(e.target.value)}
					required
					placeholder="State"
					className="profile-input"
				/>
				<input
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					required
					placeholder="Country"
					className="profile-input"
				/>
				<input
					type="text"
					value={lat}
					onChange={(e) => setLat(e.target.value)}
					required
					placeholder="Lat"
					className="profile-input"
				/>
				<input
					type="text"
					value={lng}
					onChange={(e) => setLng(e.target.value)}
					required
					placeholder="Lng"
					className="profile-input"
				/>
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
					type="text"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
					placeholder="Price"
					className="profile-input"
				/>

				<button type="submit" className="profile-input submit">
					Publish
				</button>
			</form>
		</>
	);
}

export default ReviewsCreateModal;
