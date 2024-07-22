##

<span style=" font-size:24px; text-decoration:underline;
">**This doc contains apis's reponse message in success and in fail scenerios..** </span>

### <span style="border: 4px solid white; padding: 5px;">Admin</span>

#### Register

- End Point : /api/v1/aregister (POST)
- Scenerio : Success
- Example Data
 <div style="border: 2px solid white; padding: 5px" > 
    {
        "email":"berat@ex.com",
        "password": "1234",
        "rePassword": "1234",
        "roles":"Admin"
    }
</div>
 
<div>
     Response: 

    { 
        "success": true, 
        "error": false, "message": 
        "registration succeful." 
    }
</div>

  
  - Scenerio : Fail

 <div style="border: 2px solid white; padding: 5px" > 
   {
        "email":"berat@ex.com",
        "password": "1234",
        "rePassword": "12345",
        "roles":"Admin"
    }

</div> 

<div>
     Response: 

    { 
        "success": false, 
        "error": true, 
        "message": "Passwords do not match" 
    }
</div>




#### Login 

- End Point : /api/v1/alogin (POST)
- Scenerio : Success
- Example Data

 <div style="border: 2px solid white; padding: 5px" > 
    {
        "email":"berat@ex.com",
        "password": "1234",
        "sessionExpiredTime": "120", (Optional - min)
        "sessionIxExpired": "true" (Optional)
    }
</div>

<div>
    - Response: 

    { 
        "success": true, 
        "error": "false", 
        "message": "Login successful",
        "loginRecord": { 
            "id": 1, 
            "email": "berat@ex.com", 
            "token": "75136a6e9d1a91723b7ab181429141f24936d579697e44fc48785a409ee55408",
            "sessionExpireTime": null,
            "sessionIsExpired": null,
             "loginTime": "2024-01-26T13:23:07.463Z",
             "logoutTime": "2024-01-26T13:23:07.463Z" }}
</div>

- Scenerio : Fail
- Example Data


 <div style="border: 2px solid white; padding: 5px" > 
    {
        "email":"berat@ex.com",
        "password": "12345",
        "sessionExpiredTime": "120", (Optional - min)
        "sessionIxExpired": "true" (Optional)
    }
</div>

 <div style="border: 2px solid white; padding: 5px" > 
    {
        "email":"berat2@ex.com",
        "password": "1234",
        "sessionExpiredTime": "120", (Optional - min)
        "sessionIxExpired": "true" (Optional)
    }
</div>
 <div style="border: 2px solid white; padding: 5px" > 
    {
        "email":"berat2@ex.com",
        "password": "12345",
        "sessionExpiredTime": "120", (Optional - min)
        "sessionIxExpired": "true" (Optional)
    }
</div>
<div>
     Response: 

    { 
        "success": false, 
        "error": true, 
        "message": "Invalid credentials" 
    }
</div>


#### Logout

- End Point : /api/v1/alogout (DELETE)
- Scenerio : Success
- It checks there is a record on the Login table. If there is, cookie is removed from table.

<div>
     Response: 

    { 
        "success": true, 
        "error": false, 
        "message": "Logout successful" 
    }
</div>

- If there is no record on the table. That returns message like

<div>
     Response: 

    { 
        "success": true, 
        "error": false, 
        "message": "No active session found." 
    }
</div>

### <span style="border: 4px solid white; padding: 5px;">Branch</span>

- End Point : /api/v1/branch (POST)
- Scenerio : Success
- Example Data

 <div style="border: 2px solid white; padding: 5px" > 
{
  "id": 2,
  "name": "Example2 Branch",
  "location": "Example Location"
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 2,
        "name": "Example Branch",
        "location": "Example Location",
        "companyID": 2,
        "createdAt": "2024-01-29T08:54:25.030Z",
        "updateAt": "2024-01-29T08:54:25.030Z"
    },
    "message": "Branch created succesfully"
    }
</div>

- End Point : /api/v1/branch (GET)
- Scenerio : Success
 
<div>
    - Response: 

    {
    "success": true,
    "error": false,
    "response": 
    [
        {
            "id": 2,
            "name": "Example Branch",
            "location": "Example Location",
            "companyID": 2,
            "createdAt": "2024-01-29T08:54:25.030Z",
            "updateAt": "2024-01-29T08:54:25.030Z"
        },
        {
            "id": 3,
            "name": "Example2 Branch",
            "location": "Example Location",
            "companyID": 2,
            "createdAt": "2024-01-29T08:55:56.651Z",
            "updateAt": "2024-01-29T08:55:56.651Z"
        }
    ],
    "message": "Branches are listes"
}
</div>

- End Point : /api/v1/branch:id (GET)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
{
  "id": 2,
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 2,
        "name": "Example Branch",
        "location": "Example Location",
        "companyID": 2,
        "createdAt": "2024-01-29T08:54:25.030Z",
        "updateAt": "2024-01-29T08:54:25.030Z"
    },
    "message": "Branches are listes"
    }
</div>

- End Point : /api/v1/branch:id (PUT)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
 PARAM 
{
  "id": 2,
}
BODY 
{
  "id": 2,
  "name": "Example Branch3",
  "location": "Example Location"
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 2,
        "name": "Example Branch3",
        "location": "Example Location",
        "companyID": 2,
        "createdAt": "2024-01-29T08:54:25.030Z",
        "updateAt": "2024-01-29T08:54:25.030Z"
    },
    "message": "Branch updated succesfully"
    }
</div>


- End Point : /api/v1/branch:id (DELETE)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
 
{
  "id": 2,
}

</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 2,
        "name": "Example Branch3",
        "location": "Example Location",
        "companyID": 2,
        "createdAt": "2024-01-29T08:54:25.030Z",
        "updateAt": "2024-01-29T08:54:25.030Z"
    },
    "message": "Branches are deleted"
    }
</div>



### <span style="border: 4px solid white; padding: 5px;">Copamny</span>

- End Point : /api/v1/company (POST)
- Scenerio : Success
- Example Data

 <div style="border: 2px solid white; padding: 5px" > 
{
  "name": "Sample Company",
  "registration_number": "12345678911",
  "industry": "Technology",
  "website": "https://www.samplecompany.com",
  "phone_number": "+1 (123) 456-7890",
  "address": "123 Main Street, Cityville, Country"
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 7,
        "name": "Sample Company",
        "registration_number": "12345678911",
        "industry": "Technology",
        "website": "https://www.samplecompany.com",
        "phone_number": "+1 (123) 456-7890",
        "address": "123 Main Street, Cityville, Country",
        "createdAt": "2024-01-30T11:45:43.001Z",
        "updatedAt": "2024-01-30T11:45:43.001Z"
    },
    "message": "Data is/are created successfully."
    }
</div>

- End Point : /api/v1/camera (GET)
- Scenerio : Success
 
<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": [
        {
            "id": 2,
            "name": "Sample Company",
            "registration_number": "123456789",
            "industry": "Technology",
            "website": "https://www.samplecompany.com",
            "phone_number": "+1 (123) 456-7890",
            "address": "123 Main Street, Cityville, Country",
            "createdAt": "2024-01-29T06:34:00.924Z",
            "updatedAt": "2024-01-29T06:34:00.924Z"
        },
        {
            "id": 7,
            "name": "Sample Company",
            "registration_number": "12345678911",
            "industry": "Technology",
            "website": "https://www.samplecompany.com",
            "phone_number": "+1 (123) 456-7890",
            "address": "123 Main Street, Cityville, Country",
            "createdAt": "2024-01-30T11:45:43.001Z",
            "updatedAt": "2024-01-30T11:45:43.001Z"
        }
    ],
    "message": "Data is/are listed."
    }
</div>

- End Point : /api/v1/camera:id (GET)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
{
  "id": 7,
}
</div>

<div>
    - Response: 

    {
    "success": true,
    "error": false,
    "response": {
        "id": 7,
        "branchID": 1,
        "model": "Example Model4",
        "resolution": "Full HD",
        "install_date": "2024-01-23T12:00:00.000Z",
        "type": "Digital",
        "status": "Active",
        "protocol": "RTSP",
        "host": null,
        "port": 23,
        "label": "Example Label",
        "channel": 1,
        "operationDetails": {
            "x": 1,
            "y": 2
        },
        "createdAt": "2024-01-29T09:20:45.432Z",
        "updateAt": "2024-01-29T09:20:45.432Z"
    },
    "message": "Data is/are listed."
    }
</div>

- End Point : /api/v1/camera:id (PUT)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
 PARAM 
{
  "id": 7,
}
BODY 
{
  "name": "Sample Company2",
  "registration_number": "12345678911",
  "industry": "Technology",
  "website": "https://www.samplecompany.com",
  "phone_number": "+1 (123) 456-7890",
  "address": "123 Main Street, Cityville, Country"
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 7,
        "name": "Sample Company2",
        "registration_number": "12345678911",
        "industry": "Technology",
        "website": "https://www.samplecompany.com",
        "phone_number": "+1 (123) 456-7890",
        "address": "123 Main Street, Cityville, Country",
        "createdAt": "2024-01-30T11:45:43.001Z",
        "updatedAt": "2024-01-30T11:45:43.001Z"
    },
    "message": "Data is/are updated."
    }
</div>


- End Point : /api/v1/camera:id (DELETE)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
 
{
  "id": 7,
}

</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 7,
        "name": "Sample Company2",
        "registration_number": "12345678911",
        "industry": "Technology",
        "website": "https://www.samplecompany.com",
        "phone_number": "+1 (123) 456-7890",
        "address": "123 Main Street, Cityville, Country",
        "createdAt": "2024-01-30T11:45:43.001Z",
        "updatedAt": "2024-01-30T11:45:43.001Z"
    },
    "message": "Data is/are deleted."
    }
</div>



### <span style="border: 4px solid white; padding: 5px;">Camera</span>

- End Point : /api/v1/company (POST)
- Scenerio : Success
- Example Data

 <div style="border: 2px solid white; padding: 5px" > 
{
    "branchID":  1,
    "model": "Example Model4",
    "user": "beratcam",
    "password": "1234",
    "resolution": "Full HD",
    "install_date": "2024-01-23T12:00:00Z",
    "type": "Digital",
    "status": "Active",
    "protocol": "RTSP",
    "host":"http://example.com/stream",
    "port": 23,
    "label": "Example Label",
    "channel": 1,
    "adittional": { "x" : 1, "y" : 2}
}
</div>

<div>
    - Response: 

    {
    "success": true,
    "error": false,
    "response": {
        "id": 12,
        "branchID": 1,
        "user": "beratcam",
        "password": "1234",
        "model": "Example Model4",
        "resolution": "Full HD",
        "install_date": "2024-01-23T12:00:00.000Z",
        "type": "Digital",
        "status": "Active",
        "protocol": "RTSP",
        "host": "http://example.com/stream",
        "port": 23,
        "label": "Example Label",
        "channel": 1,
        "adittional": {
            "x": 1,
            "y": 2
        },
        "createdAt": "2024-02-01T08:00:06.659Z",
        "updateAt": "2024-02-01T08:00:06.659Z"
    },
    "message": "Data is/are created successfully."
}
</div>

- End Point : /api/v1/company (GET)
- Scenerio : Success
 
<div>
    - Response: 

    {
    "success": true,
    "error": false,
    "response": [
        {
            "id": 3,
            "branchID": 1,
            "model": "Example Model13",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": null,
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-23T12:24:16.984Z",
            "updateAt": "2024-01-23T12:24:16.984Z"
        },
        {
            "id": 6,
            "branchID": 1,
            "model": "Example Model4",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": null,
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-29T09:19:20.029Z",
            "updateAt": "2024-01-29T09:19:20.029Z"
        },
        {
            "id": 7,
            "branchID": 1,
            "model": "Example Model4",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": null,
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-29T09:20:45.432Z",
            "updateAt": "2024-01-29T09:20:45.432Z"
        },
        {
            "id": 8,
            "branchID": 1,
            "model": "Example Model4",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": null,
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-29T09:22:12.433Z",
            "updateAt": "2024-01-29T09:22:12.433Z"
        },
        {
            "id": 9,
            "branchID": 1,
            "model": "Example Model4",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": null,
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-29T09:22:34.087Z",
            "updateAt": "2024-01-29T09:22:34.087Z"
        },
        {
            "id": 10,
            "branchID": 1,
            "model": "Example Model4",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": "http://example.com/stream",
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-29T09:24:07.917Z",
            "updateAt": "2024-01-29T09:24:07.917Z"
        },
        {
            "id": 11,
            "branchID": 1,
            "model": "Example Model4",
            "resolution": "Full HD",
            "install_date": "2024-01-23T12:00:00.000Z",
            "type": "Digital",
            "status": "Active",
            "protocol": "RTSP",
            "host": "http://example.com/stream",
            "port": 23,
            "label": "Example Label",
            "channel": 1,
            "operationDetails": {
                "x": 1,
                "y": 2
            },
            "createdAt": "2024-01-29T11:16:43.415Z",
            "updateAt": "2024-01-29T11:16:43.415Z"
        }
    ],
    "message": "cameras are listed."
    }
</div>

- End Point : /api/v1/company:id (GET)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
{
  "id": 9,
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 9,
        "branchID": 1,
        "model": "Example Model4",
        "resolution": "Full HD",
        "install_date": "2024-01-23T12:00:00.000Z",
        "type": "Digital",
        "status": "Active",
        "protocol": "RTSP",
        "host": null,
        "port": 23,
        "label": "Example Label",
        "channel": 1,
        "operationDetails": {
            "x": 1,
            "y": 2
        },
        "createdAt": "2024-01-29T09:22:34.087Z",
        "updateAt": "2024-01-29T09:22:34.087Z"
    },
    "message": "camera is listed."
    }
</div>

- End Point : /api/v1/company:id (PUT)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
 PARAM 
{
  "id": 9,
}
BODY 
{
    "branchID": 1,
    "model": "Example Model133",
    "resolution": "Full HD",
    "install_date": "2024-01-23T12:00:00Z",
    "type": "Analog",
    "status": "Active",
    "protocol": "RTSP",
    "streaming_url": "http://example.com/stream",
    "port": 23,
    "label": "Example Label",
    "channel": 1,
    "operationDetails": {
        "x": 1,
        "y": 2
    }
}
</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 11,
        "branchID": 1,
        "model": "Example Model133",
        "resolution": "Full HD",
        "install_date": "2024-01-23T12:00:00.000Z",
        "type": "Analog",
        "status": "Active",
        "protocol": "RTSP",
        "host": "http://example.com/stream",
        "port": 23,
        "label": "Example Label",
        "channel": 1,
        "operationDetails": {
            "x": 1,
            "y": 2
        },
        "createdAt": "2024-01-29T11:16:43.415Z",
        "updateAt": "2024-01-29T11:16:43.415Z"
    },
    "message": "camera is updated.."
    }
</div>


- End Point : /api/v1/company:id (DELETE)
- Scenerio : Success

 <div style="border: 2px solid white; padding: 5px" > 
 
{
  "id": 9,
}

</div>

<div>
    - Response: 
    
    {
    "success": true,
    "error": false,
    "response": {
        "id": 9,
        "branchID": 1,
        "model": "Example Model4",
        "resolution": "Full HD",
        "install_date": "2024-01-23T12:00:00.000Z",
        "type": "Digital",
        "status": "Active",
        "protocol": "RTSP",
        "host": null,
        "port": 23,
        "label": "Example Label",
        "channel": 1,
        "operationDetails": {
            "x": 1,
            "y": 2
        },
        "createdAt": "2024-01-29T09:22:34.087Z",
        "updateAt": "2024-01-29T09:22:34.087Z"
    },
    "message": "camera is deleted."
}
</div>



