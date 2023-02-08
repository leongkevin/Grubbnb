import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
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
			<div className={ulClassName} ref={ulRef}>
				<div className="user-action-dropdown">
					<div>
						{user.firstName} {user.lastName}
					</div>
					<div>{user.email}</div>
					<div>
						<button onClick={logout}>
							Log out
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfileButton;
