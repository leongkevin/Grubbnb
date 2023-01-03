# AirBnB Clone

## Database Schema Design

![Database Schema](https://github.com/leongkevin/AirBnB/blob/main/Backend/images/airbnb-clone.jpg)
Source: https://dbdiagram.io/d/631fa35d0911f91ba59287fb

## API Documentation

## All endpoints that require authentication

All endpoints that require a current user to be logged in.

-   Request: endpoints that require authentication
-   Error Response: Require authentication

    -   Status Code: 401
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Authentication required",
        	"statusCode": 401
        }
        ```

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

-   Request: endpoints that require authentication
-   Error Response: Require authentication

    -   Status Code: 401
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Authentication required",
        	"statusCode": 401
        }
        ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

-   Request: endpoints that require proper authorization
-   Error Response: Require proper authorization

    -   Status Code: 403
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Forbidden",
        	"statusCode": 403
        }
        ```

## SPOTS

### Get all Spots

Returns all the spots.

-   Require Authentication: false
-   Request

    -   Method: GET
    -   URL: /spots
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"Spots": [
        		{
        			"id": 1,
        			"ownerId": 1,
        			"address": "123 Disney Lane",
        			"city": "San Francisco",
        			"state": "California",
        			"country": "United States of America",
        			"lat": 37.7645358,
        			"lng": -122.4730327,
        			"name": "App Academy",
        			"description": "Place where web developers are created",
        			"price": 123,
        			"createdAt": "2021-11-19 20:39:36",
        			"updatedAt": "2021-11-19 20:39:36",
        			"avgRating": 4.5,
        			"previewImage": "image url"
        		}
        	]
        }
        ```

### Get all Spots owned by the Current User

Returns all the spots owned (created) by the current user.

-   Require Authentication: true
-   Request

    -   Method: GET
    -   URL: /api/spots/current
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"Spots": [
        		{
        			"id": 1,
        			"ownerId": 1,
        			"address": "123 Disney Lane",
        			"city": "San Francisco",
        			"state": "California",
        			"country": "United States of America",
        			"lat": 37.7645358,
        			"lng": -122.4730327,
        			"name": "App Academy",
        			"description": "Place where web developers are created",
        			"price": 123,
        			"createdAt": "2021-11-19 20:39:36",
        			"updatedAt": "2021-11-19 20:39:36",
        			"avgRating": 4.5,
        			"previewImage": "image url"
        		}
        	]
        }
        ```



### Create a Spot

Creates and returns a new spot.

-   Require Authentication: true
-   Request

    -   Method: POST
    -   URL: /api/spots
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"address": "123 Disney Lane",
        	"city": "San Francisco",
        	"state": "California",
        	"country": "United States of America",
        	"lat": 37.7645358,
        	"lng": -122.4730327,
        	"name": "App Academy",
        	"description": "Place where web developers are created",
        	"price": 123
        }
        ```

-   Successful Response

    -   Status Code: 201
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"id": 1,
        	"ownerId": 1,
        	"address": "123 Disney Lane",
        	"city": "San Francisco",
        	"state": "California",
        	"country": "United States of America",
        	"lat": 37.7645358,
        	"lng": -122.4730327,
        	"name": "App Academy",
        	"description": "Place where web developers are created",
        	"price": 123,
        	"createdAt": "2021-11-19 20:39:36",
        	"updatedAt": "2021-11-19 20:39:36"
        }
        ```

-   Error Response: Body validation error

    -   Status Code: 400
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Validation Error",
        	"statusCode": 400,
        	"errors": [
        		"Street address is required",
        		"City is required",
        		"State is required",
        		"Country is required",
        		"Latitude is not valid",
        		"Longitude is not valid",
        		"Name must be less than 50 characters",
        		"Description is required",
        		"Price per day is required"
        	]
        }
        ```


### Create a Booking from a Spot based on the Spot's id

Create and return a new booking from a spot specified by id.

-   Require Authentication: true
-   Require proper authorization: Spot must NOT belong to the current user
-   Request

    -   Method: POST
    -   URL: /api/spots/:spotId/bookings
    -   Body:

        ```json
        {
        	"startDate": "2021-11-19",
        	"endDate": "2021-11-20"
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"id": 1,
        	"spotId": 1,
        	"userId": 2,
        	"startDate": "2021-11-19",
        	"endDate": "2021-11-20",
        	"createdAt": "2021-11-19 20:39:36",
        	"updatedAt": "2021-11-19 20:39:36"
        }
        ```

-   Error response: Body validation errors

    -   Status Code: 400
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Validation error",
        	"statusCode": 400,
        	"errors": ["endDate cannot be on or before startDate"]
        }
        ```

-   Error response: Couldn't find a Spot with the specified id

    -   Status Code: 404
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Spot couldn't be found",
        	"statusCode": 404
        }
        ```

-   Error response: Booking conflict

    -   Status Code: 403
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Sorry, this spot is already booked for the specified dates",
        	"statusCode": 403,
        	"errors": [
        		"Start date conflicts with an existing booking",
        		"End date conflicts with an existing booking"
        	]
        }
        ```

### Edit a Booking

Update and return an existing booking.

-   Require Authentication: true
-   Require proper authorization: Booking must belong to the current user
-   Request

    -   Method: PUT
    -   URL: /api/bookings/:bookingId
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"startDate": "2021-11-19",
        	"endDate": "2021-11-20"
        }
        ```

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"id": 1,
        	"spotId": 1,
        	"userId": 2,
        	"startDate": "2021-11-19",
        	"endDate": "2021-11-20",
        	"createdAt": "2021-11-19 20:39:36",
        	"updatedAt": "2021-11-20 10:06:40"
        }
        ```

-   Error response: Body validation errors

    -   Status Code: 400
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Validation error",
        	"statusCode": 400,
        	"errors": ["endDate cannot come before startDate"]
        }
        ```

-   Error response: Couldn't find a Booking with the specified id

    -   Status Code: 404
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Booking couldn't be found",
        	"statusCode": 404
        }
        ```

-   Error response: Can't edit a booking that's past the end date

    -   Status Code: 403
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Past bookings can't be modified",
        	"statusCode": 403
        }
        ```

-   Error response: Booking conflict

    -   Status Code: 403
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Sorry, this spot is already booked for the specified dates",
        	"statusCode": 403,
        	"errors": [
        		"Start date conflicts with an existing booking",
        		"End date conflicts with an existing booking"
        	]
        }
        ```

### Delete a Booking

Delete an existing booking.

-   Require Authentication: true
-   Require proper authorization: Booking must belong to the current user or the
    Spot must belong to the current user
-   Request

    -   Method: DELETE
    -   URL: /api/bookings/:bookingId
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Successfully deleted",
        	"statusCode": 200
        }
        ```

-   Error response: Couldn't find a Booking with the specified id

    -   Status Code: 404
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Booking couldn't be found",
        	"statusCode": 404
        }
        ```

-   Error response: Bookings that have been started can't be deleted

    -   Status Code: 403
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Bookings that have been started can't be deleted",
        	"statusCode": 403
        }
        ```

## IMAGES

### Delete a Spot Image

Delete an existing image for a Spot.

-   Require Authentication: true
-   Require proper authorization: Spot must belong to the current user
-   Request

    -   Method: DELETE
    -   URL: /api/spot-image/:spotImageId
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Successfully deleted",
        	"statusCode": 200
        }
        ```

-   Error response: Couldn't find a Spot Image with the specified id

    -   Status Code: 404
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Spot Image couldn't be found",
        	"statusCode": 404
        }
        ```

### Delete a Review Image

Delete an existing image for a Review.

-   Require Authentication: true
-   Require proper authorization: Review must belong to the current user
-   Request

    -   Method: DELETE
    -   URL: /api/review-images/:reviewImageId
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Successfully deleted",
        	"statusCode": 200
        }
        ```

-   Error response: Couldn't find a Review Image with the specified id

    -   Status Code: 404
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Review Image couldn't be found",
        	"statusCode": 404
        }
        ```

## Add Query Filters to Get All Spots

Return spots filtered by query parameters.

-   Require Authentication: false
-   Request

    -   Method: GET
    -   URL: api/spots
    -   Query Parameters
        -   page: integer, minimum: 0, maximum: 10, default: 0
        -   size: integer, minimum: 0, maximum: 20, default: 20
        -   minLat: decimal, optional
        -   maxLat: decimal, optional
        -   minLng: decimal, optional
        -   maxLng: decimal, optional
        -   minPrice: decimal, optional, minimum: 0
        -   maxPrice: decimal, optional, minimum: 0
    -   Body: none

-   Successful Response

    -   Status Code: 200
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"Spots": [
        		{
        			"id": 1,
        			"ownerId": 1,
        			"address": "123 Disney Lane",
        			"city": "San Francisco",
        			"state": "California",
        			"country": "United States of America",
        			"lat": 37.7645358,
        			"lng": -122.4730327,
        			"name": "App Academy",
        			"description": "Place where web developers are created",
        			"price": 123,
        			"createdAt": "2021-11-19 20:39:36",
        			"updatedAt": "2021-11-19 20:39:36",
        			"previewImage": "image url"
        		}
        	],
        	"page": 2,
        	"size": 25
        }
        ```

-   Error Response: Query parameter validation errors

    -   Status Code: 400
    -   Headers:
        -   Content-Type: application/json
    -   Body:

        ```json
        {
        	"message": "Validation Error",
        	"statusCode": 400,
        	"errors": [
        		"Page must be greater than or equal to 0",
        		"Size must be greater than or equal to 0",
        		"Maximum latitude is invalid",
        		"Minimum latitude is invalid",
        		"Maximum longitude is invalid",
        		"Minimum longitude is invalid",
        		"Maximum price must be greater than or equal to 0",
        		"Minimum price must be greater than or equal to 0"
        	]
        }
        ```
