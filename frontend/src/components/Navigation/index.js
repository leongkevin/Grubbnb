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
import SwitchToHostingButton from './SwitchToHostingButton';
import GrubbnbYourHomeButton from './GrubbnbYourHomeButton';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<div id="wrapper">
				<div id="wrapper-a"></div>
				<div id="wrapper-b">
					{' '}
					<img
						src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
						className="bnbhub-logo"
					/>
				</div>
				<div id="wrapper-c"></div>
				<div id="wrapper-d">
					<div id="right-wrapper-2">
						<ProfileButton user={sessionUser} />
					</div>

					<div id="right-wrapper-1">
						<SwitchToHostingButton />
					</div>
				</div>

				<div id="wrapper-e"></div>
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
				<div>
					<GrubbnbYourHomeButton />
				</div>
				<div>
					<Authentication user={sessionUser} />
				</div>
			</div>
		);
	}

	return (
		// <ul>
		// 	<NavLink exact to="/">
		// 		<div>

		// 		</div>
		// 	</NavLink>
		// 	{isLoaded && sessionLinks}
		// </ul>

		<div>
			<NavLink exact to="/"></NavLink>
			{isLoaded && sessionLinks}
		</div>
	);
}

export default Navigation;
