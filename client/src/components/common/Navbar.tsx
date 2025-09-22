import { useState } from 'react'; // Essential React hook for managing component state.
import { Link } from 'react-router-dom'; // Used for client-side navigation without full page reloads.
import { Menu, X, Home, Users, UserPlus, ChartNoAxesGantt } from 'lucide-react'; // Icon library for visual elements.

/**
 * @function Navbar
 * @description A functional React component that renders the application's navigation bar.
 * It includes navigation links, a logo, and responsive behavior for mobile and desktop views.
 * This component is crucial for overall application navigation and user experience.
 */
const Navbar = () => {
    // State to manage the visibility of the mobile menu.
    // `isMenuOpen` controls whether the mobile navigation dropdown is displayed.
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Defines the navigation links as a reusable JSX fragment.
    // This promotes reusability and consistency between desktop and mobile menus.
    const navLinks = (
        <>
            <li>
                {/* Link to the Home page. */}
                <Link
                    to="/" // Specifies the target URL for the link.
                    className="flex items-center gap-2 hover:text-wb-accent transition-colors" // Tailwind CSS classes for styling.
                    onClick={() => setIsMenuOpen(false)} // Closes the mobile menu on link click for better UX.
                >
                    <Home size={20} /> {/* Home icon from lucide-react. */}
                    <span>Home</span>
                </Link>
            </li>
            <li>
                {/* Link to the User List page. */}
                <Link
                    to="/users" // Navigates to the user listing page.
                    className="flex items-center gap-2 hover:text-wb-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)} // Ensures menu closes after selection.
                >
                    <Users size={20} /> {/* Users icon. */}
                    <span>User List</span>
                </Link>
            </li>
            <li>
                {/* Link to the Add User page. */}
                <Link
                    to="/add-user" // Navigates to the page for adding new users.
                    className="flex items-center gap-2 hover:text-wb-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)} // Closes menu for consistent behavior.
                >
                    <UserPlus size={20} /> {/* Add User icon. */}
                    <span>Add User</span>
                </Link>
            </li>
        </>
    );

    return (
        // Main navigation container with styling.
        // `bg-wb-primary` sets the background color, `shadow-lg` adds depth.
        <nav className="bg-wb-primary text-white p-4 shadow-lg relative">
            <div className="container mx-auto flex justify-between items-center">
                {/* Application Logo/Brand, links to the Home page. */}
                <div className="flex-1">
                    <Link
                        to="/" // Logo acts as a home button.
                        className="flex items-center gap-2 text-xl font-bold hover:text-wb-accent transition-colors"
                    >
                        <ChartNoAxesGantt color="#ffffff" size={24} /> {/* Logo icon. */}
                        <span>UserApp</span> {/* Application name. */}
                    </Link>
                </div>

                {/* Desktop Navigation Menu - visible only on large screens. */}
                {/* `hidden lg:flex` ensures this menu is only displayed on large screens and above. */}
                <div className="hidden lg:flex">
                    <ul className="flex space-x-4">{navLinks}</ul> {/* Renders the defined navigation links. */}
                </div>

                {/* Mobile Menu Button - visible only on small/medium screens. */}
                {/* `lg:hidden` hides this button on large screens. */}
                <div className="lg:hidden flex-none">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}> {/* Toggles mobile menu visibility state. */}
                        {/* Conditionally renders Menu or X icon based on `isMenuOpen` state. */}
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown - conditionally rendered based on `isMenuOpen` state. */}
            {/* This block is only rendered if `isMenuOpen` is true, providing the mobile dropdown. */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-wb-primary z-20">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        {navLinks} {/* Renders the same navigation links as desktop. */}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar; // Exports the Navbar component for use throughout the application.