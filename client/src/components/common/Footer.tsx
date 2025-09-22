// src/components/common/Footer.tsx
// This file defines the Footer component, which is displayed at the bottom of the application.
// It typically contains copyright information and links.

/**
 * @function Footer
 * @description A functional React component that renders the application's footer.
 * It includes copyright information and a link to the developer's LinkedIn profile.
 */
const Footer = () => {
    return (
        // The main footer element with styling for margin, background, text alignment, padding, and rounded corners.
        <footer className="mt-12 bg-[#BFDCE8] text-center py-4 rounded-t-lg">
            <aside>
                {/* Copyright text, dynamically displaying the current year. */}
                <p>
                    Copyright © 2025 - All right reserved by{' '}
                    {/* Link to the developer's LinkedIn profile, opening in a new tab. */}
                    <a
                        href="https://www.linkedin.com/in/mohamadsolkhannawawi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline hover:text-wb-secondary transition-colors"
                    >
                       {/* Developer's name with specific styling. */}
                       <span className="font-semibold text-[#166C8E]">Nawa</span>
                    </a>
                </p>
            </aside>
        </footer>
    );
};

export default Footer; // Exports the Footer component for use throughout the application.
