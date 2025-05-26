import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">Digital PhotoBooth</h1>
          <p className="text-xl md:text-2xl text-black/90 mb-8">Capture your moments with style and create lasting memories</p>
          <Link href="/photo" className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3] rounded-full md:text-2xl font-bold text-black">
            Start Capturing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
