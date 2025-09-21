// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import AddUserPage from './pages/AddUserPage';

function App() {
    return (
        <Router>
            <Toaster position="top-right" /> {/* Add Toaster component */}
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/users" element={<UserListPage />} />
                        <Route path="/add-user" element={<AddUserPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}
export default App;
