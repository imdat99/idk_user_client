import { AlertTriangle } from 'lucide-react';

const ErrorScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-700 px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Oops! Something went wrong.</h1>
      <p className="text-sm text-red-600 mb-6 text-center">
        We're having trouble loading this page. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Reload Page
      </button>
    </div>
  );
};

export default ErrorScreen;
