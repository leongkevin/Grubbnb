import { useParams, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as spotActions from '../../store/spot';

const DeleteSpotButton = () => {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const history = useHistory();


	const deleteSpot = async (e) => {
		e.preventDefault();
		dispatch(spotActions.deleteSpotAction(spotId))
		.then(() => history.push("/"));
	};

	return (
		<div>
			<h1>DeleteSpotButton</h1>
			<button onClick={deleteSpot}>Delete</button>
		</div>
	);
};

export default DeleteSpotButton;

// delete from store
// delete from thunk