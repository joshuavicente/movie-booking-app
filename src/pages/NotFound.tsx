// Fallback page for unmatched routes (404 error)
export const NotFound = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-gray-50"
      role="main"
      aria-label="Page not found"
    >
      {/* Icon or emoji */}
      <div className="text-6xl mb-4">🚫</div>

      {/* 404 heading */}
      <h1 className="text-5xl font-extrabold text-red-600 mb-2">404</h1>

      {/* Message to inform user */}
      <p className="text-lg text-gray-700 mb-6 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Link to redirect back to login/home */}
      <a
        href="/"
        className="inline-block px-5 py-2 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
        aria-label="Go back to login page"
      >
        Go back home
      </a>
    </main>
  );
};
