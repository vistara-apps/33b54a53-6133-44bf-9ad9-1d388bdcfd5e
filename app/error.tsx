'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center max-w-md w-full">
        <div className="text-6xl mb-4">😿</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          Your PixelPals encountered an error. Don't worry, they're still safe!
        </p>
        <button
          onClick={reset}
          className="action-button w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
