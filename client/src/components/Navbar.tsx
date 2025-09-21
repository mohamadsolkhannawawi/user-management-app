import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Users, UserPlus, ChartNoAxesGantt } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = (
        <>
            <li>
                <Link
                    to="/"
                    className="flex items-center gap-2 hover:text-wb-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <Home size={20} />
                    <span>Home</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/users"
                    className="flex items-center gap-2 hover:text-wb-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <Users size={20} />
                    <span>User List</span>
                </Link>
            </li>
            <li>
                <Link
                    to="/add-user"
                    className="flex items-center gap-2 hover:text-wb-accent transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <UserPlus size={20} />
                    <span>Add User</span>
                </Link>
            </li>
        </>
    );

    return (
        <nav className="bg-wb-primary text-white p-4 shadow-lg relative">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="flex-1">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-xl font-bold hover:text-wb-accent transition-colors"
                    >
                        <ChartNoAxesGantt color="#ffffff" size={24} />
                        <span>UserApp</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex">
                    <ul className="flex space-x-4">{navLinks}</ul>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex-none">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-wb-primary z-20">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        {navLinks}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
