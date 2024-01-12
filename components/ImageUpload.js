import { useState } from "react";

export default function ImageUpload({ setFormImage, error, formData }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setFormImage((prevData) => ({
      ...prevData,
      image: "",
    }));

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: image,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image URL:", data.url);
        setFormImage((prevData) => ({
          ...prevData,
          image: data.url,
        }));
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center mt-8 w-full">
      {error && (
        <div className="bg-red-500 flex mx-auto  justify-center w-1/2 text-white p-2 mb-4 rounded-lg">
          {error}
        </div>
      )}
      <label htmlFor="imageInput" className="mb-4 block cursor-pointer">
        {image ? (
          <img
            src={image}
            alt="Selected"
            className="max-w-full max-h-48 mb-4 mx-auto rounded-lg"
          />
        ) : (
          <div className="border-2 px-5 py-20 border-dashed border-gray-300  rounded-lg">
            <span className="text-gray-600 text-lg">
              Select an image or drag it here
            </span>
          </div>
        )}
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <br />
      {formData.image.trim() ? (
        <p className="text-green-500 mt-2 font-bold">image Uploaded</p>
      ) : (
        <button
          onClick={handleUpload}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }}`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
      )}
    </div>
  );
}
