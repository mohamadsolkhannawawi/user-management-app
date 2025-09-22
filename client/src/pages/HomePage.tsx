// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; // Make sure to install this package: npm install react-intersection-observer

const HomePage = () => {
    // For How It Works
    const { ref: howItWorksRef, inView: howItWorksInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // For Closing CTA
    const { ref: ctaRef, inView: ctaInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const featureItems = [
        {
            title: 'Fast Search & Filter',
            desc: 'Find the right user instantly.',
        },
        {
            title: 'Smart Sorting & Pagination',
            desc: 'Browse long lists without the scroll fatigue.',
        },
        {
            title: 'Inline Editing',
            desc: 'Update details in a snap.',
        },
        {
            title: 'Status Badges',
            desc: 'See who’s active at a glance.',
        },
        {
            title: 'Responsive by Design',
            desc: 'Smooth on mobile, tablet, and desktop.',
        },
        {
            title: 'Clear Notifications',
            desc: 'Friendly toasts for success and errors.',
        },
    ];

    const firstRowFeatures = featureItems.slice(0, 3);
    const secondRowFeatures = featureItems.slice(3, 6);

    const { ref: firstRowRef, inView: firstRowInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const { ref: secondRowRef, inView: secondRowInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <div className="container mx-auto p-8">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-lg shadow-lg mb-12">
                <h1 className="mb-5 text-5xl md:text-6xl font-extrabold text-[#166C8E] leading-tight">
                    Welcome to UserApp
                </h1>
                <p className="mb-8 text-lg md:text-xl font-bold text-gray-900 max-w-3xl">
                    Manage your users with clarity and speed. Search, filter,
                    sort, and edit in seconds — backed by a modern stack built
                    for reliability.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/users"
                        className="inline-block bg-[#166C8E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#145772] transition-colors duration-300 shadow-md"
                    >
                        View User List
                    </Link>
                    <Link
                        to="/add-user"
                        className="inline-block bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 shadow-md"
                    >
                        Add New User
                    </Link>
                </div>
            </section>

            {/* Social Proof/Tech Stack Strip */}
            <section className="bg-[#BFDCE8] py-6 text-center text-gray-800 text-md rounded-lg shadow-inner mb-12">
                <p className="font-medium">
                    Built with{' '}
                    <span className="font-semibold text-[#166C8E]">React</span>,{' '}
                    <span className="font-semibold text-[#166C8E]">
                        Node.js
                    </span>
                    , and{' '}
                    <span className="font-semibold text-[#166C8E]">
                        PostgreSQL
                    </span>{' '}
                    — designed for fast, stable, and scalable user management.
                </p>
            </section>

            {/* Feature Highlights */}
            <section className="mb-12">
                <h2 className="text-4xl font-bold text-center text-[#166C8E] mb-8">
                    Feature Highlights
                </h2>
                <div className="flex flex-col gap-8">
                    {' '}
                    {/* Use flex-col to stack rows */}
                    {/* First Row */}
                    <div
                        ref={firstRowRef}
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${firstRowInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    >
                        {firstRowFeatures.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                            >
                                <h3 className="text-xl font-semibold text-[#166C8E] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-700">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    {/* Second Row */}
                    <div
                        ref={secondRowRef}
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${secondRowInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                    >
                        {secondRowFeatures.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                            >
                                <h3 className="text-xl font-semibold text-[#166C8E] mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-700">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section
                ref={howItWorksRef}
                className={`mb-12 bg-gray-50 p-8 rounded-lg shadow-inner transition-all duration-700 ease-out ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="text-4xl font-bold text-center text-[#166C8E] mb-8">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            step: 1,
                            title: 'Add users',
                            desc: 'Create profiles with name, email, phone, and department.',
                        },
                        {
                            step: 2,
                            title: 'Manage the list',
                            desc: 'Search, filter, sort, and update status with ease.',
                        },
                        {
                            step: 3,
                            title: 'Stay informed',
                            desc: 'Clear alerts and toasts keep every action transparent.',
                        },
                    ].map((item) => (
                        <div key={item.step} className="text-center">
                            <div className="text-5xl text-[#166C8E] mb-4">
                                {item.step}
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-700">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Closing CTA */}
            <section
                ref={ctaRef}
                className={`bg-[#166C8E] text-white py-12 text-center rounded-lg shadow-xl transition-all duration-700 ease-out ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="text-4xl font-bold mb-6">
                    Ready to get organized?
                </h2>
                <Link
                    to="/add-user"
                    className="inline-block bg-white text-[#166C8E] font-bold py-4 px-8 rounded-lg text-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                >
                    Add New User
                </Link>
            </section>
        </div>
    );
};

export default HomePage;
