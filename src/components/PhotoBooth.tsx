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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-8">
        <div className="max-w-4xl mx-auto">
          <PhotoEditor photos={photos} onBack={() => setIsEditing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">Digital PhotoBooth</h2>

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
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex justify-center">
                {photos.length < 4 ? (
                  <div className="text-center">
                    <button onClick={capture} className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                      Take Photo {photos.length + 1}/4
                    </button>
                    <p className="mt-2 text-gray-600">Click to take photo {photos.length + 1} of 4</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <button onClick={retake} className="bg-gray-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-700 transition-colors">
                      Retake Photos
                    </button>
                    <button onClick={() => setIsEditing(true)} className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
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
