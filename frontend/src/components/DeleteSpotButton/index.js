import React from 'react';
import { Link } from 'react-router-dom';

import { removeReports } from '../store/reportsReducer';
import { useSelector, useDispatch } from 'react-redux';

const ReportIndexItem = ({ report } ) => {
	const dispatch = useDispatch();

	const deleteReport = (e) => {
		e.preventDefault();
		dispatch(removeReports(report.id));
	};

  return (
    <li>
      <Link to={`/reports/${report.id}`}>Report #{report.id}</Link>
      <Link to={`/reports/${report.id}/edit`}>Edit</Link>
      <button onClick={deleteReport}>Delete</button>
    </li>
  );
};

export default ReportIndexItem;

