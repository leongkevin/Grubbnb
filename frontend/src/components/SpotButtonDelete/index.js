import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spot';

const SpotButtonDelete = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const history = useHistory();

	const spotComponent = useSelector((state) => Object.values(state.spot));

	const deleteSpot = async (e) => {
		e.preventDefault();
		dispatch(spotActions.deleteSpotAction(spotId)).then(() =>
			history.push('/spots/current')
		);
	};

	return (
		<div>
			<button onClick={deleteSpot} className="profile-input submit">


				{spotComponent.map((spot) => {
							if (parseInt(spotId) === spot.id) {
								return (
									<>
										<div className='spot-owner-action-button'>Delete {spot.name}</div>
									</>
								);
							}
						})}
			</button>
		</div>
	);
};

export default SpotButtonDelete;

// delete from store
// delete from thunk
