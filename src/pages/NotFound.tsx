export const NotFound = () => {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center"
      role="main"
      aria-label="Page not found"
    >
      <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
      <p className="text-xl text-gray-700 mb-4" role="alert">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="text-blue-600 hover:underline"
        aria-label="Go back to login page"
      >
        Go back home
      </a>
    </main>
  );
};
