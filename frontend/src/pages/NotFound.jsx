function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-blue-600">404</h1>

        <p className="mt-4 text-2xl font-semibold">
          Page Not Found
        </p>

        <p className="mt-2 text-gray-600">
          The page you are looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;