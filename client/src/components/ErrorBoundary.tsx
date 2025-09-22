// src/components/ErrorBoundary.tsx
// This file defines a React Error Boundary component.
// Error Boundaries catch JavaScript errors anywhere in their child component tree,
// log those errors, and display a fallback UI instead of crashing the entire application.

import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * @interface Props
 * @description Defines the props for the ErrorBoundary component.
 * @property {ReactNode} children - The child components that the ErrorBoundary will protect.
 */
interface Props {
    children?: ReactNode;
}

/**
 * @interface State
 * @description Defines the state for the ErrorBoundary component.
 * @property {boolean} hasError - Indicates whether an error has been caught.
 */
interface State {
    hasError: boolean;
}

/**
 * @class ErrorBoundary
 * @extends {Component<Props, State>}
 * @description A React class component that acts as an Error Boundary.
 * It catches JavaScript errors in its child component tree and renders a fallback UI.
 */
class ErrorBoundary extends Component<Props, State> {
    // Initialize the component's state.
    public state: State = {
        hasError: false,
    };

    /**
     * @static
     * @method getDerivedStateFromError
     * @description Lifecycle method that is called after an error has been thrown by a descendant component.
     * It updates the state to trigger the fallback UI.
     * @returns {State} An object to update the state.
     */
    public static getDerivedStateFromError(): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    /**
     * @method componentDidCatch
     * @description Lifecycle method that is called after an error has been thrown by a descendant component.
     * It's used for logging error information.
     * @param {Error} error - The error that was thrown.
     * @param {ErrorInfo} errorInfo - An object with a `componentStack` key containing information about which component threw the error.
     */
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        // You can also log the error to an error reporting service here (e.g., Sentry, Bugsnag).
    }

    /**
     * @method render
     * @description Renders the component's UI.
     * If an error has been caught, it renders a fallback UI; otherwise, it renders its children.
     * @returns {ReactNode} The fallback UI or the children components.
     */
    public render() {
        if (this.state.hasError) {
            // Fallback UI displayed when an error occurs.
            return (
                <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-800 p-4">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Oops! Something went wrong.
                        </h1>
                        <p className="text-lg">
                            We're sorry, but an unexpected error occurred.
                        </p>
                        <p className="text-sm mt-2">
                            Please try refreshing the page.
                        </p>
                    </div>
                </div>
            );
        }

        // Render children normally if no error has occurred.
        return this.props.children;
    }
}

export default ErrorBoundary;