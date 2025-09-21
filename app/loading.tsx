export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🐾</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading PixelPals...</h2>
        <p className="text-white/80">Preparing your virtual pets</p>
      </div>
    </div>
  );
}
