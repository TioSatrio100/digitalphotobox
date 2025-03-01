import Link from 'next/link';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Digital PhotoBooth
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          Capture your moments with style and create lasting memories
        </p>
        <Link 
          href="/photo"
          className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-opacity-90 hover:transform hover:scale-105 shadow-lg"
        >
          Start Capturing
        </Link>
      </div>
    </div>
  );
};

export default Hero; 