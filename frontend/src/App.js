import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import SpotPage from './components/SpotPage';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Hosting from './components/CurrentPage';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route exact path="/current">
						<Hosting />
					</Route>
					<Route path="/spots/:spotId">
						<SpotPage />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
