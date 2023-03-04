import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

function DemoUserButton() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			sessionActions.login({
				credential: 'Demo-lition',
				password: 'password',
			})
		)
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<button type="submit" className='profile'>Demo</button>
		</form>
	);
}

export default DemoUserButton;
