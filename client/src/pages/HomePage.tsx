// src/pages/HomePage.tsx
// This file defines the HomePage component, serving as the landing page for the User Management Application.
// It provides an overview of the application's features and directs users to key functionalities.

// import React from 'react'; // Core React library for building UI components.
import { Link } from 'react-router-dom'; // Used for declarative navigation within the application.
import { useInView } from 'react-intersection-observer'; // Hook to detect when an element enters or exits the viewport, used for scroll-triggered animations.

const HomePage = () => {
    // Hook to observe the "How It Works" section for scroll-triggered animations.
    // `howItWorksRef` is attached to the DOM element, `howItWorksInView` becomes true when the element is visible.
    const { ref: howItWorksRef, inView: howItWorksInView } = useInView({
        triggerOnce: true, // Animation triggers only once when the element first enters the viewport.
        threshold: 0.1, // 10% of the element must be visible to trigger `inView`.
    });

    // Hook to observe the "Closing Call to Action" section for scroll-triggered animations.
    const { ref: ctaRef, inView: ctaInView } = useInView({
        triggerOnce: true, // Animation triggers only once.
        threshold: 0.1, // 10% visibility threshold.
    });

    // Defines the data for the feature highlights section.
    // Each object represents a feature with a title and a description.
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

    // Splits the feature items into two rows for layout purposes in the UI.
    const firstRowFeatures = featureItems.slice(0, 3);
    const secondRowFeatures = featureItems.slice(3, 6);

    // Hook to observe the first row of feature highlights for scroll-triggered animations.
    const { ref: firstRowRef, inView: firstRowInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    // Hook to observe the second row of feature highlights for scroll-triggered animations.
    const { ref: secondRowRef, inView: secondRowInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        // Main container for the home page content, centered with automatic margins and padding.
        <div className="container mx-auto p-8">
            {/* Hero Section: The main introductory section of the homepage. */}
            <section className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-lg shadow-lg mb-12">
                {/* Main heading of the application. */}
                <h1 className="mb-5 text-5xl md:text-6xl font-extrabold text-[#166C8E] leading-tight">
                    Welcome to UserApp
                </h1>
                {/* Sub-heading or descriptive text for the application's purpose. */}
                <p className="mb-8 text-lg md:text-xl font-light text-gray-900 max-w-3xl">
                    Manage your users with clarity and speed. Search, filter,
                    sort, and edit in seconds backed by a modern stack built
                    for reliability.
                </p>

                {/* Call-to-action buttons for navigating to user list or adding a new user. */}
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Link to the user list page. */}
                    <Link
                        to="/users"
                        className="inline-block bg-[#166C8E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#145772] transition-colors duration-300 shadow-md"
                    >
                        View User List
                    </Link>
                    {/* Link to the add new user page. */}
                    <Link
                        to="/add-user"
                        className="inline-block bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300 shadow-md"
                    >
                        Add New User
                    </Link>
                </div>
            </section>

            {/* Social Proof/Tech Stack Strip: Highlights the technologies used to build the application. */}
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

            {/* Feature Highlights Section: Displays key features of the application. */}
            <section className="mb-12">
                <h2 className="text-4xl font-bold text-center text-[#166C8E] mb-8">
                    Feature Highlights
                </h2>
                <div className="flex flex-col gap-8">
                    {/* First Row of Features: Uses `useInView` for a slide-in animation. */}
                    <div
                        ref={firstRowRef}
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${firstRowInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    >
                        {/* Maps through the first set of features to render each as a card. */}
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
                    {/* Second Row of Features: Uses `useInView` for a slide-in animation from the opposite direction. */}
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

            {/* How It Works Section: Explains the basic steps of using the application. */}
            <section
                ref={howItWorksRef}
                className={`mb-12 bg-gray-50 p-8 rounded-lg shadow-inner transition-all duration-700 ease-out ${howItWorksInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="text-4xl font-bold text-center text-[#166C8E] mb-8">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Maps through predefined steps to illustrate the workflow. */}
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

            {/* Closing Call to Action (CTA) Section: Encourages users to start using the application. */}
            <section
                ref={ctaRef}
                className={`bg-[#166C8E] text-white py-12 text-center rounded-lg shadow-xl transition-all duration-700 ease-out ${ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="text-4xl font-bold mb-6">
                    Ready to get organized?
                </h2>
                {/* Button to navigate to the add new user page. */}
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
