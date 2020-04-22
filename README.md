# Fire Alert - API Documentation

#### Distributed Systems | SE3020 | Assignment 2

This API is responsible to handle all the sensor details and administrator authentication data.

The API has deployed in the Heroku. This url could be used to interact with it.

> **_URL = `https://fire-alert-solution.herokuapp.com/`_**

## Open Endpoints

Open endpoints require no Authentication.

### admin

-   **POST** `URL/api/v1/admin/signup` : Register a new admin
    > The request must have the admin object with following attributes. Email should be a **_valid email address_** and the password should contain **_at least 8 characters_**.

**Sample Admin Object that expected by the server**

```json
{
	"name": "Admin Name",
	"email": "adminemail@gmail.com",
	"password": "mypassword",
	"passwordConfirm": "mypassword"
}
```

-   **POST** `URL/api/v1/admin/login` : Returns a access token

> The request must have a object with following attributes.

**Sample Login Request Object**

```json
{
	"email": "adminemail@gmail.com",
	"password": "mypassword"
}
```

-   **GET** `URL/api/v1/admin` : Returns all the admin documents

> This endpoint just returns admins **_Name_** and the **_Email address_**. It doesn't contain the encrypted password.

### sensors

-   **GET** `URL/api/v1/sensors` : Returns all the sensor documents
-   **GET** `URL/api/v1/sensors/<sensor-id>` : Returns one specific sensor document

**Sample Sensor Document should POST**

```json
{
	"_id": "<sensor-id-that-mentioned-in-the-sensor>",
	"activated": true,
	"floor": "4th",
	"room": "X111"
}
```

### sensorReadings

-   **GET** `URL/api/v1/sensorReadings/<sensor-id>` : Returns all the readings documents of given sensor-id
-   **POST** `URL/api/v1/sensorReadings/<sensor-id>` : Adds a sensor reading to given sensor-id

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

-   **PATCH** `URL/api/v1/admin/<admin-id>` : Update admin details
    > This endpoint allows only to update the **Name and the Email Address** of the admin.

### sensors

-   **POST** `URL/api/v1/sensors` : Create a new sensor document
-   **PATCH** `URL/api/v1/sensors/<sensor-id>` : Update existing sensor document
-   **DELETE** `URL/api/v1/sensors/<sensor-id>` : Delete specific sensor document

**Sample Sensor Document**

```json
{
	"_id": "5e8a13e64bc0b91a18ab6903",
	"activated": true,
	"floor": "5th",
	"room": "B203"
}
```

## Special Endpoints

### email

-   **POST** `URL/api/v1/email` : Sends warning email to the admin / given email address

> This endpoint uses a separate authentication mechanism. You need to have the email sending access token which pre defined in the server to send email. The token must be included in the headers in following format.

> **KEY** `Authorization` | **VALUE** `<email-sending-access-token>`

**Sample Request Object**

```json
{
	"to": "recipient@email.com",
	"sensor": "5e8a13e64bc0b91a18ab6903",
	"reading": {
		"smokeLevel": 4,
		"co2Level": 8,
		"time": "2020-04-05T17:37:39.281Z"
	}
}
```

### sms

-   **POST** `URL/api/v1/sms` : Sends sms alert to the admin / given mobile number

> This endpoint uses a separate authentication mechanism. You need to have the email sending access token which pre defined in the server to send email. The token must be included in the headers in following format.

> **KEY** `Authorization` | **VALUE** `<sms-sending-access-token>`

**Sample Request Object**

```json
{
	"to": "94xxxxxxxxxx",
	"sensor": "5e8a13e64bc0b91a18ab6903"
}
```
