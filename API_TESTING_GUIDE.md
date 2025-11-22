# Authentication API Endpoints - Testing Guide

## Base URL
- **Local Development**: `http://localhost:5000`
- **Production**: Your deployed server URL

---

## 1. Sign In (POST)

**Endpoint**: `POST /api/auth/signin`

**Description**: Authenticates a user and returns a JWT token.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Success Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401 Unauthorized):
```json
{
  "message": "Invalid credentials"
}
```

**cURL Example**:
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"yourpassword"}'
```

**JavaScript/Fetch Example**:
```javascript
const response = await fetch('http://localhost:5000/api/auth/signin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'yourpassword'
  })
});

const data = await response.json();
console.log(data.token); // Save this token for authenticated requests
```

---

## 2. Sign Out (GET)

**Endpoint**: `GET /api/auth/signout`

**Description**: Signs out the current user. Since JWT is stateless, this endpoint confirms sign out on the server side. The client should discard the token.

**Request Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Success Response** (200 OK):
```json
{
  "message": "Signed out"
}
```

**Error Response** (401 Unauthorized):
```json
{
  "message": "Not authorized"
}
```

**cURL Example**:
```bash
curl -X GET http://localhost:5000/api/auth/signout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**JavaScript/Fetch Example**:
```javascript
const token = 'YOUR_JWT_TOKEN_HERE'; // Get from signin response

const response = await fetch('http://localhost:5000/api/auth/signout', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const data = await response.json();
console.log(data.message); // "Signed out"
// Discard the token from client storage
```

---

## 3. Sign Up (POST) - Bonus

**Endpoint**: `POST /api/auth/signup`

**Description**: Creates a new user account.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response** (201 Created):
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "created": "2024-01-01T00:00:00.000Z"
}
```

---

## 4. Get Current User (GET) - Bonus

**Endpoint**: `GET /api/auth/me`

**Description**: Returns the current authenticated user's information.

**Request Headers**:
```
Authorization: Bearer <your_jwt_token>
```

**Success Response** (200 OK):
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "created": "2024-01-01T00:00:00.000Z",
  "updated": null
}
```

---

## Testing Workflow

1. **First, sign up a new user** (if you don't have one):
   ```bash
   POST /api/auth/signup
   ```

2. **Sign in to get a token**:
   ```bash
   POST /api/auth/signin
   # Save the token from the response
   ```

3. **Use the token for authenticated requests**:
   ```bash
   GET /api/auth/me
   GET /api/auth/signout
   ```

4. **Sign out** (token is now invalid on client side):
   ```bash
   GET /api/auth/signout
   ```

---

## Postman Collection

### Sign In Request
- **Method**: POST
- **URL**: `http://localhost:5000/api/auth/signin`
- **Headers**: `Content-Type: application/json`
- **Body** (raw JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "testpassword"
  }
  ```

### Sign Out Request
- **Method**: GET
- **URL**: `http://localhost:5000/api/auth/signout`
- **Headers**: 
  - `Authorization: Bearer {{token}}`
  - (Set `token` variable from signin response)

---

## Notes

- JWT tokens expire after **1 hour** by default
- Store the token securely on the client side (localStorage, sessionStorage, or httpOnly cookies)
- Include the token in the `Authorization` header as `Bearer <token>` for protected routes
- The signout endpoint is protected and requires a valid token

