# Air Quality Visualizer - API Documentation

Distributed Systems | SE3020 |  Assignment 2

This API is responsible to handle all the sensor details and administrator details. Most of the end points are open and for administrator login uses a simple authentication method.

## Open Endpoints

Open endpoints require no Authentication.

### sensors

* GET    `localhost:8000/api/v1/sensors`               : Returns all the sensor document
* GET    `localhost:8000/api/v1/sensors/<sensor-id>`   : Returns one specific sensor document
* POST   `localhost:8000/api/v1/sensors`               : Create a new sensor document
* PATCH  `localhost:8000/api/v1/sensors/<sensor-id>`   : Update existing sensor document
* DELETE `localhost:8000/api/v1/sensors/<sensor-id>`   : Delete specific sensor document

**Sample Sensor Document**

```json
{
  "_id": "5e8a13e64bc0b91a18ab6903",
  "activated": true,
  "floor": "5th",
  "room": "B203"
}
```

### sensorReadings

* GET    `localhost:8000/api/v1/sensorReadings/<sensor-id>`          : Returns all the readings documents of given sensor-id
* GET    `localhost:8000/api/v1/sensorReadings/<sensor-id>?time=last`: Returns the last reading documents of given sensor-id
* POST   `localhost:8000/api/v1/sensorReadings/<sensor-id>`          : Adds a sensor reading to given sensor-id

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

This end point requires the password as a query parameter

* POST    `localhost:8000/api/v1/admin/<password>`: Accepts admin object and returns boolean value that indicates authentication status

**Accepts**
```json
{
  "userName": "<admin-username>",
  "password": "<admin-password>"
}
```

**Reaturns**

```json
{
  "status": "Access Granted",
  "data": {
  "authorized": true
  }
}
```
