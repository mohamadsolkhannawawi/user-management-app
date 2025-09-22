# User Management App

User Management App is a web-based application consisting of a frontend (React + TypeScript + Tailwind + Vite) and a backend (Node.js + Express + Prisma + PostgreSQL). This project supports CRUD operations for user data, search, filter, sorting, and active/inactive user management.

---

## Project Structure

```
user-management-app/
├── client/        # React frontend
│   ├── src/
│   │   ├── api/           # API service
│   │   ├── components/    # UI components
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Application pages
│   │   ├── types/         # Data types
│   │   └── utils/         # Utilities
│   ├── public/
│   ├── package.json
│   └── ...
├── server/        # Express backend
│   ├── src/
│   │   ├── controllers/   # API controllers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── index.ts       # Server entry point
│   ├── prisma/            # Prisma ORM & migrations
│   ├── package.json
│   └── ...
└── README.md      # Main documentation
```

---

## Main Features

### Frontend

- User table with sorting, filtering, and search
- Add & edit user forms with validation
- Delete user confirmation modal
- Pagination
- Active/inactive user status
- Responsive & modern UI (Tailwind CSS)

### Backend

- RESTful API for user CRUD
- Data validation (Zod)
- PostgreSQL database via Prisma ORM
- Dummy data seeding
- Error handling
- CORS support

---

## Installation & Running

### Prerequisites

- Node.js & npm
- PostgreSQL (or use a cloud database)

### Installation Steps

1. **Clone the repository**
    ```powershell
    git clone <repo-url>
    cd user-management-app
    ```
2. **Install dependencies**
    ```powershell
    cd server; npm install; cd ../client; npm install
    ```
3. **Setup database**
    - Edit `server/.env` and set `DATABASE_URL` to your PostgreSQL connection string.
    - Run migration & seed data:
        ```powershell
        cd ../server
        npx prisma migrate dev --name init
        npx prisma db seed
        ```
4. **Run backend**
    ```powershell
    npm start
    # or
    npx ts-node src/index.ts
    ```
5. **Run frontend**
    ```powershell
    cd ../client
    npm run dev
    ```

### Deployment

- Deploy backend to platforms like Railway, Vercel, Heroku, or VPS.
- Deploy frontend to Vercel, Netlify, or other static hosting.
- Make sure environment variables & database connection are set up.

---

## Backend API Documentation

Base URL: `http://localhost:5001/api/users`

| Method | Endpoint | Description       | Body (JSON)                                            |
| ------ | -------- | ----------------- | ------------------------------------------------------ |
| GET    | `/`      | Get all users     | -                                                      |
| GET    | `/:id`   | Get user by ID    | -                                                      |
| POST   | `/`      | Add new user      | { nama, email, nomorTelepon, departemen, statusAktif } |
| PUT    | `/:id`   | Update user by ID | { nama, email, nomorTelepon, departemen, statusAktif } |
| DELETE | `/:id`   | Delete user by ID | -                                                      |

### Example: Add User Request

```json
POST /api/users
{
  "nama": "Budi Santoso",
  "email": "budi@example.com",
  "nomorTelepon": "081234567890",
  "departemen": "IT",
  "statusAktif": true
}
```

### Success Response

```json
{
    "id": 1,
    "nama": "Budi Santoso",
    "email": "budi@example.com",
    "nomorTelepon": "081234567890",
    "departemen": "IT",
    "statusAktif": true,
    "createdAt": "2025-09-22T10:00:00.000Z",
    "updatedAt": "2025-09-22T10:00:00.000Z"
}
```

---

## Contribution & License

Feel free to fork, submit pull requests, or use this project for your user management needs.

License: MIT
