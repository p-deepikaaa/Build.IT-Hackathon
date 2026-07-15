# NeighborGrid Backend APIs

## Base URL
http://127.0.0.1:8000

### Create Request
POST /requests

### Get All Requests
GET /requests

### Get Pending Requests
GET /requests/pending

### Update Request Status
PATCH /requests/{request_id}

Body:
{
  "status": "Matched"
}

### Create Resource
POST /resources

### Get All Resources
GET /resources

### Get Available Resources
GET /resources/available