import { useState } from "react";
import React from "react";

interface PhotoEditorProps {
  photos: string[];
  onBack: () => void;
}

const FRAME_STYLES = [
  {
    name: "None",
    value: "bg-white",
    downloadStyle: "white",
  },
  {
    name: "Pastel Pink",
    value: "bg-pink-200",
    downloadStyle: "rgb(251, 207, 232)",
  },
  {
    name: "Pastel Blue",
    value: "bg-blue-200",
    downloadStyle: "rgb(191, 219, 254)",
  },
  {
    name: "Pastel Green",
    value: "bg-green-200",
    downloadStyle: "rgb(187, 247, 208)",
  },
  {
    name: "Purple Gradient",
    value: "bg-gradient-to-b from-purple-500 to-pink-500",
    downloadStyle: "linear-gradient(to bottom, rgb(168, 85, 247), rgb(236, 72, 153))",
  },
  {
    name: "Ocean Waves",
    value: "bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500",
    downloadStyle: "linear-gradient(to right, rgb(59, 130, 246), rgb(45, 212, 191), rgb(59, 130, 246))",
  },
  {
    name: "Sunset",
    value: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
    downloadStyle: "linear-gradient(to bottom right, rgb(251, 146, 60), rgb(236, 72, 153), rgb(147, 51, 234))",
  },
];

const PhotoEditor = ({ photos, onBack }: PhotoEditorProps) => {
  const [selectedStyle, setSelectedStyle] = useState(FRAME_STYLES[0]);

  const downloadPhotos = async () => {
    const container = document.createElement("div");
    container.style.width = "400px";
    container.style.paddingLeft = "20px";
    container.style.paddingRight = "20px";
    container.style.paddingTop = "40px";
    container.style.paddingBottom = "40px";
    container.style.background = selectedStyle.downloadStyle;
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "20px";
    container.style.borderRadius = "12px";
    document.body.appendChild(container);

    try {
      // Process each photo
      for (const photo of photos) {
        const imgContainer = document.createElement("div");
        imgContainer.style.padding = "12px";
        imgContainer.style.background = "white";
        imgContainer.style.borderRadius = "8px";
        imgContainer.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        imgContainer.style.position = "relative";

        const img = document.createElement("img");
        img.src = photo;
        img.style.width = "100%";
        img.style.aspectRatio = "4/3";
        img.style.objectFit = "cover";
        img.style.borderRadius = "4px";
        imgContainer.appendChild(img);

        container.appendChild(imgContainer);
      }

      const watermark = document.createElement("div");
      watermark.style.color = "white";
      watermark.style.textAlign = "center";
      watermark.style.fontFamily = "sans-serif";
      watermark.style.fontSize = "14px";
      watermark.style.marginTop = "10px";
      watermark.style.textShadow = "1px 1px 2px rgba(0,0,0,0.3)";
      watermark.textContent = "made by tiosatrio100";
      container.appendChild(watermark);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(container, {
        background: selectedStyle.downloadStyle,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = "photobooth-photos.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-6">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-4xl mx-auto my-10">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2">
            <span>← Back to Photos</span>
          </button>
          <h2 className="text-3xl font-bold text-center text-purple-600">Edit Photos</h2>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Choose Frame Color</h3>
          <div className="flex gap-4 flex-wrap">
            {FRAME_STYLES.map((style) => (
              <button
                key={style.name}
                onClick={() => setSelectedStyle(style)}
                className={`px-6 py-2 rounded-full border-2 transition-all ${selectedStyle.name === style.name ? "border-purple-500 bg-purple-50" : "border-gray-200 hover:border-gray-300"}`}
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>

        <div className={`max-w-md mx-auto ${selectedStyle.value} pt-16 pb-10 px-6 rounded-xl my-8`}>
          <div className="flex flex-col gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="relative rounded-lg overflow-hidden bg-white p-3 shadow-md">
                <img src={photo} alt={`Photo ${index + 1}`} className="w-full aspect-[4/3] object-cover rounded" />
              </div>
            ))}
          </div>
          <p className="text-white text-center mt-4 text-sm text-shadow">made by tiosatrio100</p>
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={downloadPhotos} className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
            Download Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
