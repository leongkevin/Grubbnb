import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import CreateSpotModal from '../CreateSpotModal';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';

function HostingButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

	return (
		<>
			<div>
				{/* <button className="hosting-button">Grubbnb your home</button> */}
				<OpenModalButton
					buttonText="Grubbnb Setup"

					modalComponent={<CreateSpotModal />}
				/>
				<button className="hosting-button">Switch to hosting</button>
			</div>
		</>
	);
}

export default HostingButton;
