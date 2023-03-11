import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory, useParams } from 'react-router-dom';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	const history = useHistory();

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
		dispatch(sessionActions.logout())
		history.push(`/`)
	}

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

	return (
		<>
			<button onClick={openMenu} className="profile-icon">
				<i class="fa-solid fa-bars fa-lg" />
				<i class="fa-regular fa-user fa-lg" />
			</button>
			<div className={ulClassName} ref={ulRef}>
				<div className="user-action-dropdown">
					<div className="profile">
						{user.firstName} {user.lastName}
					</div>
					<div className="profile">{user.email}</div>
					<div>
						<button onClick={logout} className="profile">
							Log out
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default ProfileButton;
