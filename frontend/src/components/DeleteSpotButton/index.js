import { useParams, useHistory } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot';

const DeleteSpotButton = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const history = useHistory();


	const deleteSpot = async (e) => {
		e.preventDefault();
		dispatch(spotActions.deleteSpotAction(spotId))
		.then(() => history.push("/"))
	};

	return (
		<div>
			<button onClick={deleteSpot}  className="profile-input submit">Delete Spot Id: {spotId}</button>
		</div>
	);
};

export default DeleteSpotButton;

// delete from store
// delete from thunk
