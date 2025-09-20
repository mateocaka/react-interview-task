const ErrorMessage = ({ error, onRetry, title = "Error loading data" }) => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-red-600 text-lg mb-2">{title}</p>
            <p className="text-gray-500 text-sm mb-4">Please try refreshing the page</p>
            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                    Try Again
                </button>
            )}
        </div>
    </div>
);

export default ErrorMessage;
