// src/pages/HomePage.tsx

import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div
            className="hero min-h-full rounded-lg"
            style={{
                backgroundImage:
                    'url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)',
            }}
        >
            <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
            <div className="hero-content text-center text-neutral-content py-16">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">
                        Welcome to UserApp
                    </h1>
                    <p className="mb-5">
                        A simple and intuitive application to manage your users
                        efficiently. Built with a modern tech stack including
                        React, Node.js, and PostgreSQL to showcase full-stack
                        development capabilities.
                    </p>
                    <Link to="/users" className="btn btn-primary">
                        View User List
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
