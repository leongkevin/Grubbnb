import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CreateSpotModal from '../CreateSpotModal';
import OpenModalButton from '../OpenModalButton';

function Hosting() {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState([]);

	return (
		<>
			<h1 className="welcome-header">Welcome to Grubbnb</h1>
			<OpenModalButton
				buttonText="Create a new listing"
				modalComponent={<CreateSpotModal />}
			/>
		</>
	);
}

export default Hosting;
