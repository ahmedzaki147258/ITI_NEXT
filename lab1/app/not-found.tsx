export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen flex-col text-center">
            <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
            <p className="text-gray-600 mt-4">The page you're looking for doesn't exist.</p>
        </div>
    );
}