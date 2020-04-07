# Air Quality Visualizer - API Documentation
#### Distributed Systems | SE3020 |  Assignment 2

This API is responsible to handle all the sensor details and administrator authentication data.

## Open Endpoints

Open endpoints require no Authentication.

### admin

* **POST**   `localhost:8000/api/v1/admin/signup`               : Register a new admin
> The request must have the admin object with following attributes. Email should be a ***valid email addess*** and the password shoud contain ***at least 8 characters***.

```json
{
  "name": "Admin Name",
  "email": "adminemail@gmail.com",
  "password": "mypassword", 
  "passwordConfirm": "mypassword"
}
```

* **POST**   `localhost:8000/api/v1/admin/login`               : Returns a access token

> The request must have a object with following attributes.

```json
{
  "email": "adminemail@gmail.com",
  "passwordConfirm": "mypassword"
}
```

* **GET**    `localhost:8000/api/v1/admin`               : Returns all the admin documents

> This endpoint just returns admins ***Name*** and the ***Email address***. It doesn't contain the encrypted password.

### sensors

* **GET**    `localhost:8000/api/v1/sensors`               : Returns all the sensor documents
* **GET**    `localhost:8000/api/v1/sensors/<sensor-id>`   : Returns one specific sensor document

### sensorReadings

* **GET**    `localhost:8000/api/v1/sensorReadings/<sensor-id>`          : Returns all the readings documents of given sensor-id
* **GET**    `localhost:8000/api/v1/sensorReadings/<sensor-id>?time=last`: Returns the last reading documents of given sensor-id
* **POST**   `localhost:8000/api/v1/sensorReadings/<sensor-id>`          : Adds a sensor reading to given sensor-id

**Sample Sensor Reading Document**
```json
{
  "_id": "5e8a17630ae6b120ec15e137",
  "sensor": "5e8a13e64bc0b91a18ab6903",
  "reading": {
    "smokeLevel": 3,
    "co2Level": 5,
    "time": "2020-04-05T17:37:39.281Z"
  }
}
```

## Endpoints that require Authentication

To access this end points you **should pass valid token** in the request header along with the request. Once you successfully logged in to the system, it will sends you a valid token. You may **set that token to the request header** as key value pair as follows. **It must accompany this format**.

> **KEY** `Authorization` | **VALUE** `Bearer<space><the-token-that-received-when-logged-in>`

### admin

* **PATCH**  `localhost:8000/api/v1/admin/<admin-id>`   : Update admin details
> This endpoint allows only to update the **Name and the Email Address** of the admin.

### sensors

* **POST**   `localhost:8000/api/v1/sensors`               : Create a new sensor document
* **PATCH**  `localhost:8000/api/v1/sensors/<sensor-id>`   : Update existing sensor document
* **DELETE** `localhost:8000/api/v1/sensors/<sensor-id>`   : Delete specific sensor document

**Sample Sensor Document**

```json
{
  "_id": "5e8a13e64bc0b91a18ab6903",
  "activated": true,
  "floor": "5th",
  "room": "B203"
}
```
