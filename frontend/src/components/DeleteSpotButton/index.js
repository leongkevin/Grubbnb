import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spot';

const DeleteSpotButton = ({{ spot }}) => {
	const dispatch = useDispatch();

	const deleteSpot = (e) => {
		e.preventDefault();
		dispatch(removeSpot(spot.id));
	};

	return (
		// <li>
		// 	<Link to={`/reports/${report.id}`}>Report #{report.id}</Link>
		// 	<Link to={`/reports/${report.id}/edit`}>Edit</Link>
			<button onClick={deleteSpot}>Delete</button>
		// </li>
	);
};

export default DeleteSpotButton;


// import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
// import * as spotsActions from '../../store/spot';

// function SwitchToHostingButton({ user }) {
// 	const dispatch = useDispatch();
// 	const [errors, setErrors] = useState([]);

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		setErrors([]);
// 		return dispatch(spotsActions.deleteSpot({ id }))
// 		.catch(async (res) => {
// 			const data = await res.json();
// 			if (data && data.errors) setErrors(data.errors);
// 		});
// 	};

// 	return (
// 		<>
// 			<div>
// 				<button type="submit" className="hosting-button">Switch to hosting</button>
// 			</div>
// 		</>
// 	);
// }

// export default SwitchToHostingButton;
