import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Download } from "lucide-react";

const DownloadPage = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState<{ name: string; content: string } | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await fetch(`http://localhost:5001/download/${fileId}`);

        if (response.status === 404) {
          setStatusMessage("File not found.");
        } else if (response.status === 403) {
          setStatusMessage("Link Expired! 🚫");
        } else {
          const data = await response.json();
          setFile(data);
        }
      } catch (error) {
        setStatusMessage("An error occurred. Try again later.");
      }
    };

    fetchFile();
  }, [fileId]);

  const handleDownload = () => {
    if (!file) return;

    const link = document.createElement("a");
    link.href = file.content;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      {file ? (
        <>
          <h1 className="text-4xl font-bold text-neon-blue mb-6">Download Your File</h1>
          <p className="text-gray-400 mb-4">File: {file.name}</p>

          <button
            onClick={handleDownload}
            className="bg-neon-green px-6 py-3 rounded-md font-bold flex items-center space-x-2 hover:shadow-neon-green transition"
          >
            <Download className="h-6 w-6" />
            <span>Download File</span>
          </button>
        </>
      ) : (
        <p className="text-red-500 text-2xl font-bold">{statusMessage}</p>
      )}
    </div>
  );
};

export default DownloadPage;
