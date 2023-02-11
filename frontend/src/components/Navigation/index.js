import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Authentication from './Authentication';
import SwitchToHostingButton from './SwitchToHostingButton';
import GrubbnbYourHomeButton from './GrubbnbYourHomeButton';
import logo from './imgs/logo.svg';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;

	if (sessionUser) {
		sessionLinks = (
			<div id="wrapper">
				<div id="wrapper-left">
					<NavLink to="/">
						<img src={logo} className="grubbnb-logo" />
					</NavLink>
				</div>
				<div id="wrapper-center"></div>
				<div id="wrapper-right">
					<div id="right-wrapper-1">
						<NavLink to="/current">
							<SwitchToHostingButton />
						</NavLink>
					</div>
					<div id="right-wrapper-2">
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			</div>
		);
	} else {
		sessionLinks = (
			<div id="wrapper">
				<div id="wrapper-left">
					<NavLink to="/">
						<img src={logo} className="grubbnb-logo" />
					</NavLink>
				</div>
				<div id="wrapper-center"></div>
				<div id="wrapper-right">
					<div id="right-wrapper-1">
						<NavLink to="/current">
							<GrubbnbYourHomeButton />
						</NavLink>
					</div>
					<div id="right-wrapper-2">
						<Authentication />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<NavLink exact to="/"></NavLink>
			{isLoaded && sessionLinks}
		</div>
	);
}

export default Navigation;
