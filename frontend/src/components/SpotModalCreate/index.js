import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spot';

function CreateSpotModal() {
	const dispatch = useDispatch();

	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [lat, setLat] = useState('');
	const [lng, setLng] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [previewImage, setPreviewImage] = useState('');
	const [imageTwo, setImageTwo] = useState('');
	const [imageThree, setImageThree] = useState('');
	const [imageFour, setImageFour] = useState('');
	const [imageFive, setImageFive] = useState('');
	const [errors, setErrors] = useState([]);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const { closeModal } = useModal();

	// useEffect(() => {
	// 	const errors = [];
	// 	if (!name.length) errors.push('Please enter your Name');
	// }, [name]);

	// const onSubmit = e => {
	//   e.preventDefault();

	//   setHasSubmitted(true);
	//   if (errors.length) return alert(`Cannot Submit`);

	//   const contactUsInformation = {
	// 	name,
	// 	submittedOn: new Date()
	//   };

	//   console.log(contactUsInformation);
	//   setName('');
	//   setErrors([]);
	//   setHasSubmitted(false);
	// }

	const imagesArr = [previewImage, imageTwo, imageThree, imageThree, imageFour]

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		dispatch(
			spotActions.publishSpot({
				address,
				city,
				state,
				country,
				lat,
				lng,
				name,
				description,
				price,
				imagesArr
			})
		)
			.then(closeModal)
			// .catch(async (res) => {
			// 	const data = await res.json();
			// 	if (data && data.errors) setErrors(data.errors);
			// });
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
					// className="profile-input"
				/>
				<input
					type="text"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					required
					placeholder="City"
					// className="profile-input"
				/>
				<input
					type="text"
					value={state}
					onChange={(e) => setState(e.target.value)}
					required
					placeholder="State"
					// className="profile-input"
				/>
				<input
					type="text"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					required
					placeholder="Country"
					// className="profile-input"
				/>
				<input
					type="text"
					value={lat}
					onChange={(e) => setLat(e.target.value)}
					required
					placeholder="Lat"
					// className="profile-input"
				/>
				<input
					type="text"
					value={lng}
					onChange={(e) => setLng(e.target.value)}
					required
					placeholder="Lng"
					// className="profile-input"
				/>
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					placeholder="Name"
					// className="profile-input"
				/>
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
					placeholder="Description"
					// className="profile-input"
				/>
				<input
					type="text"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					required
					placeholder="Price"
					// className="profile-input"
				/>

				<input
					type="text"
					value={previewImage}
					onChange={(e) => setPreviewImage(e.target.value)}
					required
					placeholder="1st Image"
					// className="profile-input"
				/>

				<input
					type="text"
					value={imageTwo}
					onChange={(e) => setImageTwo(e.target.value)}
					required
					placeholder="2nd Image"
					// className="profile-input"
				/>

				<input
					type="text"
					value={imageThree}
					onChange={(e) => setImageThree(e.target.value)}
					required
					placeholder="3rd Image"
					// className="profile-input"
				/>

				<input
					type="text"
					value={imageFour}
					onChange={(e) => setImageFour(e.target.value)}
					required
					placeholder="4th Image"
					// className="profile-input"
				/>

				<input
					type="text"
					value={imageFive}
					onChange={(e) => setImageFive(e.target.value)}
					required
					placeholder="5th Image"
					// className="profile-input"
				/>

				<button type="submit" className="profile-input submit">
					Publish Spot
				</button>
			</form>
		</>
	);
}

export default CreateSpotModal;
