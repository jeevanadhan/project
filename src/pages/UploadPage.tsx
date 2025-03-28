import React, { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("expiresIn", "10"); // File expires in 10 minutes

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("File uploaded successfully!");
        navigate("/share"); // Redirect to share page
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold text-neon-blue mb-6">Upload Your File</h1>

      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-500 bg-gray-800 text-white rounded-md"
      />

      <button
        onClick={handleUpload}
        className="bg-neon-green px-6 py-3 rounded-md font-bold flex items-center space-x-2 hover:shadow-neon-green transition"
      >
        <Upload className="h-6 w-6" />
        <span>Upload File</span>
      </button>
    </div>
  );
};

export default UploadPage;
