import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './CreateSpots.css';

function CreateSpotsModal() {

	// check('address').isString().withMessage('Street address is required'),
	// check('city').isString().withMessage('City is required'),
	// check('state').isString().withMessage('State is required'),
	// check('country').isString().withMessage('Country is required'),
	// check('lat').isDecimal().withMessage('Latitude is not valid'),
	// check('lng').isDecimal().withMessage('Longitude is not valid'),
	// check('name')
	// 	.isString()
	// 	.withMessage('Name must be less than 50 characters'),
	// check('description').isString().withMessage('Description is required'),
	// check('price').isDecimal().withMessage('Price per day is required'),

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


	// const [email, setEmail] = useState('');
	// const [username, setUsername] = useState('');
	// const [firstName, setFirstName] = useState('');
	// const [lastName, setLastName] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');
	// const [errors, setErrors] = useState([]);
	// const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(
				sessionActions.signup({
					email,
					username,
					firstName,
					lastName,
					password,
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
		}
		return setErrors([
			'Confirm Password field must be the same as the Password field',
		]);
	};

	return (
		<>
			<h1 className='welcome-header'>Welcome to Bnb-hub</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					placeholder="Email"
					className="profile-input"
				/>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					placeholder="Username"
					className="profile-input"
				/>
				<input
					type="text"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
					placeholder="First Name"
					className="profile-input"
				/>
				<input
					type="text"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
					placeholder="Last Name"
					className="profile-input"
				/>

				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					placeholder="Password"
					className="profile-input"
				/>

				<input
					type="password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					required
					placeholder="Confirm Password"
					className="profile-input"
				/>

				<button type="submit" className="profile-input submit">
					Sign Up
				</button>
			</form>
		</>
	);
}

export default CreateSpotsModal;
