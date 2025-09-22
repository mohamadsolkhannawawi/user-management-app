// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar'; // Updated path
import Footer from './components/common/Footer'; // Updated path
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import AddUserPage from './pages/AddUserPage';
import ErrorBoundary from './components/ErrorBoundary'; // New import
import { UserProvider } from './context/UserContext'; // New import

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Toaster position="top-right" /> {/* Add Toaster component */}
                <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <UserProvider> {/* Wrap routes with UserProvider */}
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/users" element={<UserListPage />} />
                                <Route path="/add-user" element={<AddUserPage />} />
                            </Routes>
                        </UserProvider>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ErrorBoundary>
    );
}
export default App;