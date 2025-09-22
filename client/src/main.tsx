import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// This is the entry point of the React application.
// It initializes the React root and renders the main App component.

// ReactDOM.createRoot creates a React root for the application.
// It targets the HTML element with the ID 'root' in index.html.
ReactDOM.createRoot(document.getElementById('root')!).render(
    // React.StrictMode is a tool for highlighting potential problems in an application.
    // It activates additional checks and warnings for its descendants.
    <React.StrictMode>
        {/* The main application component, where all other components and routing are managed. */}
        <App />
    </React.StrictMode>
);