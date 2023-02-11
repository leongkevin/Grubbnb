import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLocation } from '../../store/review';

const ReviewCount = () => {
    const [showLocation, setShowLocation] = useState(false);
    const location = useSelector(state => state.location);
    const dispatch = useDispatch();

    useEffect(() => {
      if (showLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            dispatch(getLocation(position.coords));
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }
    }, [dispatch, showLocation]);

  return (
    <div>
      <button onClick={() => setShowLocation(!showLocation)}>
      Latitude: {location.latitude}
      </button>
      {showLocation && location ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : null}
    </div>
  );
};

export default ReviewCount;
