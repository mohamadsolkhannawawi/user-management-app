import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    UserApp
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/users">User List</Link>
                    </li>
                    <li>
                        <Link to="/add-user">Add User</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Navbar;
