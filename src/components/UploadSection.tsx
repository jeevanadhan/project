import React, { useState } from "react";
import { Upload, X } from "lucide-react";

const UploadSection = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  // File Selection Handler
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
    }
  };

  // Remove a selected file
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload Files to Backend
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files selected!");
      return;
    }

    setUploading(true);
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("file", file);
    });

    formData.append("expiresIn", "10"); // File expires in 10 minutes

    try {
      const response = await fetch("http://localhost:5001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Files uploaded successfully!");
        setFiles([]); // Clear file list after successful upload
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Secure File Upload
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Drag & drop files or click to browse.
          </p>
        </div>

        {/* Drag & Drop Box */}
        <div
          className={`mt-6 border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
            dragActive
              ? "border-indigo-500 bg-indigo-100 dark:bg-indigo-900"
              : "border-gray-300 dark:border-gray-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <Upload className={`h-12 w-12 ${dragActive ? "text-indigo-500" : "text-gray-400"}`} />
          <p className="mt-4 text-gray-700 dark:text-gray-400">
            Drag files here, or <span className="text-indigo-600 dark:text-indigo-400">click to select</span>
          </p>
          <input
            id="file-upload"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Selected Files List */}
        {files.length > 0 && (
          <div className="mt-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Selected Files
            </h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {files.map((file, index) => (
                <li key={index} className="py-2 flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">{file.name}</span>
                  <button onClick={() => removeFile(index)} className="text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className={`w-full py-2 px-4 rounded-md text-white font-bold transition ${
              files.length === 0 || uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
