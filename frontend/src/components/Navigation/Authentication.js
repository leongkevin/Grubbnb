import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import DemoUserButton from '../DemoUserButton';

function Authentication({ user }) {
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
			<button onClick={openMenu} className="profile-icon">
				<i class="fa-solid fa-bars fa-lg" />
				<i class="fa-regular fa-user fa-lg" />
			</button>
			<ul className={ulClassName} ref={ulRef}>
				<div className="user-action-dropdown">
					<div>
						<OpenModalButton
							buttonText="Sign up"
							modalComponent={<SignupFormModal />}
						/>
					</div>
					<div>
						<OpenModalButton
							buttonText="Log in"
							modalComponent={<LoginFormModal />}
						/>
					</div>
					<hr></hr>
					<div>
						<DemoUserButton />
					</div>
				</div>
			</ul>
		</>
	);
}

export default Authentication;
