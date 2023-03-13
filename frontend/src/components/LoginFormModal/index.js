import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				// console.log(data.message);
				// console.log(errors.message);
				if (data && data.message) setErrors(data.message);
				// console.log(errors);
			});
	};

	return (
		<>
			<h1 className="welcome-header">Log in to Grubbnb</h1>
			<form onSubmit={handleSubmit}>
				{/* <ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul> */}
				<div  className="welcome-header">{errors}</div>
				<div>
					<input
						type="text"
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						required
						placeholder="Email"
						className="profile-input"
					/>
				</div>
				<div>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						placeholder="Password"
						className="profile-input"
					/>
				</div>
				<div>
					<button type="submit" className="profile-input submit">
						Log In
					</button>
				</div>
			</form>
		</>
	);
}

export default LoginFormModal;
