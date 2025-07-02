### Server Side Setup

## 📁 Project Structure

```

server/
├── config/               # MongoDB, JWT, and utility configs
├── controllers/          # Route logic (userControllers.js)
├── middleware/           # Auth & error handling
├── models/               # Mongoose models (User.js, Student.js)
├── routes/               # API route definitions
├── index.js              # Server entry point
├── .env.example          # Environment variables (Convert to .env)
├── adminSeeder.js        # Script to create initial admin user

````

---

## 🧰 Prerequisites

- Node.js ≥ v14
- MongoDB (local or cloud)
- Postman or cURL for API testing
- Git

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
````

### 2. Create Environment File

Convert `.env.example` file to `.env` in the `server/` root:

```env
MONGO_URI=mongodb://localhost:27017/exzellent
PORT=5000
JWT_SECRET=yourSuperSecretKey123
JWT_EXPIRE=60m
GOOGLE_CLIENT_ID=yourGoogleClientID
GOOGLE_CLIENT_SECRET=yourGoogleClientSecret
```

### 3. Start MongoDB

Start your local MongoDB instance or ensure MongoDB Atlas is live:

```bash
mongod
```

---

### 4. Start the Server

```bash
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB connected!!
```

---

## 🔐 Admin Seeder

You can create a default admin account by running the seeder script:

### 🚀 Run Seeder

```bash
npm run seed:admin
```

This will create a default Admin:

* Email: `admin@example.com`
* Password: `admin123`

---

## 📬 API Endpoints

---

### 🔐 User Login

**POST** `/api/users/login`

```json
{
  "email": "jane@example.com",
  "password": "SecurePass123"
}
```

> 🔁 Returns a JWT token for protected routes.

---

### 🔓 Google Auth

**POST** `/api/users/google-auth`

```json
{
  "token": "<Google_Id_Token>"
}
```

## 👨‍⚖️ Lawyer

### 📝 Signup Lawyer
**POST** `/api/users/signup/lawyer`

```json
{
  "name": "Adv. Ayush Jain",
  "email": "ayushlawyer@example.com",
  "password": "Secure123",
  "specialization": "Civil Law",
  "experience": 4,
  "phone": "9876543210",
  "address": "Delhi",
  "barCouncilId": "DL2022BAR",
  "languagesSpoken": ["English", "Hindi"]
}
```

### 📄 Get Lawyer Profile
**GET** `/api/users/lawyers/getprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

### ✏️ Update Lawyer Profile
**PUT** `/api/users/lawyers/updateprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

```json
{
  "specialization": "Criminal Law",
  "experience": 5
}
```

---

## 🏛️ Law Firm

### 📝 Signup Law Firm
**POST** `/api/users/signup/lawfirm`

```json
{
  "name": "Justice & Co.",
  "email": "contact@justiceco.com",
  "password": "SecureFirmPass",
  "registrationNumber": "REG2024XYZ",
  "phone": "1234567890",
  "address": "Mumbai",
  "areasOfPractice": ["Corporate", "Real Estate"]
}
```

### 📄 Get Law Firm Profile
**GET** `/api/users/lawfirms/getprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

### ✏️ Update Law Firm Profile
**PUT** `/api/users/lawfirms/updateprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

```json
{
  "address": "BKC, Mumbai",
  "phone": "1122334455"
}
```

---

## 🧑‍💼 Paralegal

### 📝 Signup Paralegal
**POST** `/api/users/signup/paralegal`

```json
{
  "name": "Riya Kapoor",
  "email": "riya.paralegal@example.com",
  "password": "ParaSecure123",
  "expertise": "Document Drafting",
  "phone": "7778889990",
  "address": "Bangalore",
  "languagesSpoken": ["English"]
}
```

### 📄 Get Paralegal Profile
**GET** `/api/users/paralegals/getprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

### ✏️ Update Paralegal Profile
**PUT** `/api/users/paralegals/updateprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

```json
{
  "expertise": "Legal Research"
}
```

---

## 🕊️ Mediator

### 📝 Signup Mediator
**POST** `/api/users/signup/mediator`

```json
{
  "name": "Karan Mehta",
  "email": "karan.mediator@example.com",
  "password": "MediationPass",
  "areaOfFocus": "Family Law",
  "experience": 6,
  "phone": "9001122334",
  "address": "Chandigarh"
}
```

### 📄 Get Mediator Profile
**GET** `/api/users/mediators/getprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

### ✏️ Update Mediator Profile
**PUT** `/api/users/mediators/updateprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

```json
{
  "areaOfFocus": "Business Disputes"
}
```

---

## 👤 Client

### 📝 Signup Client
**POST** `/api/users/signup/client`

```json
{
  "name": "Anjali Sharma",
  "email": "anjali.client@example.com",
  "password": "Client12345",
  "phone": "8989898989",
  "address": "Pune"
}
```

### 📄 Get Client Profile
**GET** `/api/users/clients/getprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

### ✏️ Update Client Profile
**PUT** `/api/users/clients/updateprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

```json
{
  "phone": "9999999999",
  "address": "Pune - New Area"
}
```

---

## 🏢 Corporate

### 📝 Signup Corporate
**POST** `/api/users/signup/corporate`

```json
{
  "name": "LegalCorp Ltd.",
  "email": "legal@corporate.com",
  "password": "CorpPass321",
  "registrationId": "CORP2023ABC",
  "contactPerson": "Rajiv Singh",
  "phone": "7766554433",
  "address": "Hyderabad"
}
```

### 📄 Get Corporate Profile
**GET** `/api/users/corporates/getprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

### ✏️ Update Corporate Profile
**PUT** `/api/users/corporates/updateprofile/:userId`  
**Headers**: `Authorization: Bearer <JWT_TOKEN>`

```json
{
  "contactPerson": "Rajiv S. Verma"
}
```

---

## 🧪 Testing Tips

Use **Postman** or **Hoppscotch**:

* Set `Content-Type: application/json`
* For protected routes, add:

  ```
  Authorization: Bearer <JWT_TOKEN>
  ```