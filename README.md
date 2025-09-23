---
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

## Running the Project Locally

To run this project on your local machine, you'll need to use the **Vercel CLI** and have your own **PostgreSQL** database.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)
- [Vercel CLI](https://vercel.com/docs/cli)
- A PostgreSQL database (you can get a free one from [Neon](https://neon.tech/) or [Supabase](https://supabase.com/))

### Setup Steps

**1. Clone the Repository**

```bash
git clone [YOUR_REPOSITORY_LINK]
cd [YOUR_PROJECT_FOLDER]
```

**2. Install Vercel CLI**

```bash
npm i -g vercel
```

**3. Login and Link the Project**

```bash
vercel login
vercel link
```

**4. Set Up the Database**

- Get your PostgreSQL connection string.
- In your Vercel project settings, add an environment variable:
    - **Key:** `DATABASE_URL`
    - **Value:** `[YOUR_CONNECTION_STRING]`

- Run database migration locally:

    ```bash
    vercel env pull .env.development.local
    npx prisma migrate dev
    ```

**5. Run the Development Server**

```bash
vercel dev
```

Your app will be available at `http://localhost:3000`.

---

## Deployment

Deployment is straightforward with Vercel:

1. Push your code to GitHub/GitLab/Bitbucket.
2. Import the repository into Vercel.
3. Configure the environment variable `DATABASE_URL` in the Vercel dashboard.
4. Vercel will automatically build and deploy both the backend and frontend.

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

---

## Additional Resources

- **API Postman Documentation**: [View Collection](https://.postman.co/workspace/E-Commerce~8de014ec-8d43-44ac-be07-c0c5e10c2d87/collection/36177362-ebec5765-b71f-4154-a793-e11fffd073c4?action=share&creator=36177362&active-environment=36177362-0fcbc454-fb68-420e-8124-c19c8da2bf23)
- **Live Demo (Vercel)**: [User Management App Demo](https://user-management-app-fix.vercel.app/)

---

## Contribution & License

Feel free to fork, submit pull requests, or use this project for your user management needs.

License: MIT

---

## Contact

For collaboration, job opportunities, or professional inquiries, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/mohamadsolkhannawawi).

---
