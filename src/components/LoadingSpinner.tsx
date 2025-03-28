// A simple full-screen centered loading spinner component
export const LoadingSpinner = () => {
  return (
    <output
      className="h-screen flex justify-center items-center"
      aria-live="polite"
      aria-label="Content loading"
    >
      {/* Animated spinning circle for visual feedback */}
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
        aria-hidden="true"
      ></div>
    </output>
  );
};
