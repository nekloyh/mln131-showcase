import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black text-white p-8 overflow-auto">
                    <div className="max-w-2xl text-left bg-zinc-900 p-8 rounded border border-red-500">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Game Crashed</h2>
                        <p className="mb-2">Something went wrong in the 3D Engine.</p>
                        <div className="bg-black p-4 rounded font-mono text-xs text-red-300 overflow-x-auto whitespace-pre-wrap mb-4">
                            {this.state.error?.toString()}
                        </div>
                        <details className="text-zinc-500 text-xs">
                            <summary className="cursor-pointer mb-2">Stack Trace</summary>
                            <pre className="whitespace-pre-wrap">
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
