import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function SwitchToHostingButton({ user }) {
	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);

	return (
		<>
			<div>
				<NavLink exact to="/host">
					<button
						className="hosting-button"
						// onClick={}
					>
						Switch to hosting
					</button>
				</NavLink>
			</div>
		</>
	);
}

export default SwitchToHostingButton;
