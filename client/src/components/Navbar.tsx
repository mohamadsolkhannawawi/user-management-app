import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-wb-primary text-white p-4 shadow-lg flex justify-between items-center">
            <div className="flex-1">
                <Link to="/" className="text-xl font-bold hover:text-wb-accent transition-colors">
                    UserApp
                </Link>
            </div>
            <div className="flex-none">
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="hover:text-wb-accent transition-colors">Home</Link>
                    </li>
                    <li>
                        <Link to="/users" className="hover:text-wb-accent transition-colors">User List</Link>
                    </li>
                    <li>
                        <Link to="/add-user" className="hover:text-wb-accent transition-colors">Add User</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;