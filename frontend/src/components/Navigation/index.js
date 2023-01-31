import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
import DemoUserButton from '../DemoUserButton';
import Authentication from './Authentication';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<div>
				<ProfileButton user={sessionUser} />
			</div>
		);
	} else {
		sessionLinks = (
			// <li className='user-action-dropdown'>
			// 	<div>
			// 		<OpenModalButton
			// 			buttonText="Sign up"
			// 			modalComponent={<SignupFormModal />}
			// 		/>
			// 	</div>
			// 	<div>
			// 		<OpenModalButton
			// 			buttonText="Log in"
			// 			modalComponent={<LoginFormModal />}
			// 		/>
			// 	</div>
			// 	<hr></hr>
			// 	<div>
			// 		<DemoUserButton/>
			// 	</div>
			// </li>
			<div>
				<Authentication user={sessionUser} />
			</div>
		);
	}

	return (
		<ul>
			<NavLink exact to="/">
				<div>
					<h1>Bnb-hub: an airbnb clone</h1>
				</div>
			</NavLink>
			{isLoaded && sessionLinks}
		</ul>
	);
}

export default Navigation;
