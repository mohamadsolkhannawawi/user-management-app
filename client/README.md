# Client Application Overview

This document provides an overview of the client-side application, detailing its folder structure and the purpose of key files.

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **TypeScript**: A superset of JavaScript that adds static typing.
*   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
*   **Vite**: A fast build tool that provides a lightning-fast development experience.
*   **React Router DOM**: For declarative routing in React applications.
*   **Lucide React**: A collection of beautiful open-source icons.

## Folder Structure

```
client/
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── chart-no-axes-gantt.svg
│   └── vite.svg
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── api/
    │   └── userService.ts
    ├── components/
    │   ├── ErrorBoundary.tsx
    │   ├── common/
    │   │   ├── Footer.tsx
    │   │   └── Navbar.tsx
    │   └── user/
    │       ├── DeleteUserModal.tsx
    │       ├── EditUserModal.tsx
    │       ├── Pagination.tsx
    │       ├── UserListToolbar.tsx
    │       └── UserTable.tsx
    ├── context/
    │   └── UserContext.tsx
    ├── hooks/
    │   └── useUsers.ts
    ├── pages/
    │   ├── AddUserPage.tsx
    │   ├── HomePage.tsx
    │   └── UserListPage.tsx
    ├── types/
    │   └── user.d.ts
    └── utils/
        └── validation.ts
```

## File and Folder Explanations

### Root Level Files

*   `.gitignore`: Specifies intentionally untracked files that Git should ignore.
*   `eslint.config.js`: Configuration file for ESLint, used for linting and maintaining code quality.
*   `index.html`: The main HTML file that serves as the entry point for the React application.
*   `package-lock.json`: Records the exact versions of dependencies used in the project.
*   `package.json`: Contains project metadata and lists project dependencies and scripts.
*   `postcss.config.js`: Configuration for PostCSS, used for transforming CSS with JavaScript plugins.
*   `README.md`: This file, providing an overview of the client application.
*   `tailwind.config.js`: Configuration file for Tailwind CSS, where custom design tokens and utility classes can be defined.
*   `tsconfig.app.json`: TypeScript configuration specific to the application code.
*   `tsconfig.json`: Base TypeScript configuration for the project.
*   `tsconfig.node.json`: TypeScript configuration for Node.js specific files (e.g., Vite config).
*   `vite.config.ts`: Configuration file for Vite, the build tool.

### `public/`

This directory contains static assets that are served directly by the web server.

*   `chart-no-axes-gantt.svg`: An SVG image file, likely used as a logo or icon within the application.
*   `vite.svg`: Default Vite logo SVG.

### `src/`

This directory contains the core source code for the React application.

*   `App.tsx`: The main component of the React application, typically responsible for defining the overall layout and routing.
*   `index.css`: Global CSS styles for the application, often including Tailwind CSS imports and custom styles.
*   `main.tsx`: The entry point of the React application, where the root React component (`App.tsx`) is rendered into the `index.html`.
*   `vite-env.d.ts`: TypeScript declaration file for Vite-specific environment variables.

#### `src/api/`

Contains modules responsible for interacting with the backend API.

*   `userService.ts`: Defines functions for making API calls related to user management (e.g., fetching, adding, updating, deleting users).

#### `src/components/`

Houses reusable UI components.

*   `ErrorBoundary.tsx`: A React component used to catch JavaScript errors anywhere in its child component tree, log those errors, and display a fallback UI.
*   `src/components/common/`: Contains general-purpose UI components used across the application.
    *   `Footer.tsx`: The footer component displayed at the bottom of the application.
    *   `Navbar.tsx`: The navigation bar component, providing links to different sections of the application.
*   `src/components/user/`: Contains UI components specifically related to user management.
    *   `DeleteUserModal.tsx`: A modal component for confirming user deletion.
    *   `EditUserModal.tsx`: A modal component for editing existing user details.
    *   `Pagination.tsx`: A component for navigating through paginated lists of data.
    *   `UserListToolbar.tsx`: A toolbar component for actions related to the user list (e.g., search, filters).
    *   `UserTable.tsx`: A component that displays a table of user data.

#### `src/context/`

Manages global state or provides data to multiple components without prop drilling.

*   `UserContext.tsx`: Provides a React Context for managing user-related state and functions across the application.

#### `src/hooks/`

Contains custom React hooks for encapsulating reusable logic.

*   `useUsers.ts`: A custom hook for fetching, managing, and interacting with user data.

#### `src/pages/`

Contains top-level components that represent different pages or views of the application.

*   `AddUserPage.tsx`: The page component for adding a new user.
*   `HomePage.tsx`: The main landing page of the application.
*   `UserListPage.tsx`: The page component that displays a list of users.

#### `src/types/`

Defines TypeScript type definitions and interfaces.

*   `user.d.ts`: Contains TypeScript type declarations for user-related data structures.

#### `src/utils/`

Contains utility functions and helpers.

*   `validation.ts`: Provides utility functions for input validation.
