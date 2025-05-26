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
  {
    name: "Yellow Retro",
    value: "bg-yellow-300 border-4 border-black",
    downloadStyle: "rgb(253, 224, 71)",
  },
  {
    name: "Purple Retro",
    value: "bg-purple-500 border-4 border-pink-300 shadow-[4px_4px_0_#000]",
    textStyle: "text-yellow-200 [text-shadow:2px_2px_0_#4c1d95]",
    downloadStyle: "rgb(168, 85, 247)",
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
    <div className="min-h-screen bg-rose-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6">
        <div className="flex justify-between items-center mb-8">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-800 font-semibold flex items-center gap-2">
            <span>← Back to Photos</span>
          </button>
          <h2 className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3] md:text-2l font-bold text-black ">Edit Photos</h2>
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
          <p className="text-white text-center mt-4 md:text-2xl text-shadow">made by tiosatrio100</p>
        </div>

        <div className="flex justify-center mt-8">
          <button onClick={downloadPhotos} className="h-12 border-black border-2 p-2.5 bg-[#B277F3] hover:bg-[#9B5FE0] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#6e38a3] rounded-full md:text-2l font-bold text-black">
            Download Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
