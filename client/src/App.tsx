// src/App.tsx
// This file defines the main application component, setting up routing, global state, and overall layout.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Imports routing components for navigation within the application.
import { Toaster } from 'react-hot-toast'; // Imports a component for displaying toast notifications globally.
import Navbar from './components/common/Navbar'; // Imports the common navigation bar component.
import Footer from './components/common/Footer'; // Imports the common footer component.
import HomePage from './pages/HomePage'; // Imports the Home Page component.
import UserListPage from './pages/UserListPage'; // Imports the User List Page component.
import AddUserPage from './pages/AddUserPage'; // Imports the Add User Page component.
import ErrorBoundary from './components/ErrorBoundary'; // Imports the ErrorBoundary component for catching UI errors.
import { UserProvider } from './context/UserContext'; // Imports the UserProvider for global user state management.

/**
 * @function App
 * @description The root component of the client application.
 * It sets up the application's structure, including routing, global state providers, and common UI elements.
 */
function App() {
    return (
        // ErrorBoundary catches JavaScript errors in its child component tree and displays a fallback UI.
        <ErrorBoundary>
            {/* Router enables client-side routing, allowing navigation without full page reloads. */}
            <Router>
                {/* Toaster component from react-hot-toast for displaying notifications across the app. */}
                <Toaster position="top-right" />
                {/* Main application layout: a flex container ensuring footer stays at the bottom. */}
                <div className="flex flex-col min-h-screen">
                    <Navbar /> {/* Renders the global navigation bar. */}
                    {/* Main content area, grows to fill available space, centered with horizontal padding. */}
                    <main className="flex-grow container mx-auto px-4 py-8">
                        {/* UserProvider makes user-related data and functions available to all nested components. */}
                        <UserProvider>
                            {/* Routes define the different paths in the application and the components rendered for each path. */}
                            <Routes>
                                <Route path="/" element={<HomePage />} /> {/* Route for the Home Page. */}
                                <Route path="/users" element={<UserListPage />} /> {/* Route for the User List Page. */}
                                <Route path="/add-user" element={<AddUserPage />} /> {/* Route for the Add User Page. */}
                            </Routes>
                        </UserProvider>
                    </main>
                    <Footer /> {/* Renders the global footer. */}
                </div>
            </Router>
        </ErrorBoundary>
    );
}
export default App; // Exports the App component as the default export.