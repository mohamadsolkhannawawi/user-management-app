// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-full text-center p-8 bg-wb-base rounded-lg">
            <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold text-wb-primary">
                    Welcome to UserApp
                </h1>
                <p className="mb-5 text-black">
                    A simple and intuitive application to manage your users
                    efficiently. Built with a modern tech stack including
                    React, Node.js, and PostgreSQL to showcase full-stack
                    development capabilities.
                </p>
                <Link
                    to="/users"
                    className="inline-block bg-wb-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-wb-secondary transition-colors"
                >
                    View User List
                </Link>
            </div>
        </div>
    );
};

export default HomePage;