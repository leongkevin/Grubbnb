import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import CreateSpotModal from '../CreateSpotModal';
import OpenModalButton from '../OpenModalButton';
import SignupFormModalCopy from '../SignupFormModalCopy';

function GrubbnbYourHomeButton({ user }) {
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

	// const logout = (e) => {
	// 	e.preventDefault();
	// 	dispatch(sessionActions.logout());
	// };

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

	return (
		<>
			{/* <div>
				<OpenModalButton
					buttonText="Log in"
					modalComponent={<LoginFormModal />}
				/>
			</div> */}
			<div>
				<OpenModalButton
					className="hosting-button"
					buttonText="Grubbnb your home"
					// modalComponent={<CreateSpotModal />}

					modalComponent={<SignupFormModalCopy />}
				/>
			</div>
		</>
	);
}

export default GrubbnbYourHomeButton;
