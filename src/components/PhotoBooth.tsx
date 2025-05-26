import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import PhotoEditor from "./PhotoEditor";

const PhotoBooth = () => {
  const webcamRef = useRef<Webcam>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPhotos((prev) => [...prev, imageSrc]);
      }
    }
  }, [webcamRef]);

  const retake = () => {
    setPhotos([]);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="min-h-screen bg- bg-rose-50 p-8">
        <div className="max-w-4xl mx-auto">
          <PhotoEditor photos={photos} onBack={() => setIsEditing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rose-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-md p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          <h2 className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3]  md:text-2xl font-bold text-black  flex items-center justify-center mb-4">
            Digital PhotoBooth
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Webcam Preview */}
            <div className="flex-1">
              <div className="relative aspect-[3/4] bg-black rounded-lg overflow-hidden">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 1280,
                    height: 720,
                    facingMode: "user",
                    frameRate: 60,
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex justify-center">
                {photos.length < 4 ? (
                  <div className="text-center">
                    <button onClick={capture} className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3] rounded-full md:text-2l font-bold text-black">
                      Take Photo {photos.length + 1}/4
                    </button>
                    <p className="mt-2 text-gray-600">Click to take photo {photos.length + 1} of 4</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={retake} className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3] rounded-full md:text-2l font-bold text-black">
                      Retake Photos
                    </button>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3] rounded-full md:text-2l font-bold text-black"
                    >
                      Edit Photos
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Photo Strip */}
            <div className="flex-1">
              <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className={`aspect-[4/3] ${photos[index] ? "" : "border-2 border-dashed border-gray-300"} bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center`}>
                    {photos[index] ? <img src={photos[index]} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" /> : <span className="text-gray-400 text-lg">Photo {index + 1}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBooth;
