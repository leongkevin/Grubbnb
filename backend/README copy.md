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
