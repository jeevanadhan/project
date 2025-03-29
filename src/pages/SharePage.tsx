import React, { useState, useEffect } from "react";
import { Share2, Copy, Check, Clock, FileText, Mail, Send } from "lucide-react";

const SharePage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<{ id: string; name: string }[]>([]);
  const [selectedFile, setSelectedFile] = useState<{ id: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [expiryTime, setExpiryTime] = useState("24 hours");

  useEffect(() => {
    // Fetch uploaded files from localStorage
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]");
    setUploadedFiles(storedFiles);
    if (storedFiles.length > 0) setSelectedFile(storedFiles[0]); // Select first file by default
  }, []);

  const handleCopyLink = async () => {
    if (!selectedFile) return;
    const shareLink = `${window.location.origin}/download/${selectedFile.id}`;
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareViaGmail = () => {
    if (!selectedFile) return;
    const subject = "File Sharing Link";
    const body = `Here is your secure file link:\n${window.location.origin}/download/${selectedFile.id}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleLocalShare = () => {
    if (!selectedFile) return;
    if (navigator.share) {
      navigator.share({
        title: "File Sharing Link",
        text: `Download your file here: ${window.location.origin}/download/${selectedFile.id}`,
        url: `${window.location.origin}/download/${selectedFile.id}`,
      });
    } else {
      alert("Local sharing is not supported on this device.");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-[#0D1117] text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center text-[#64F4AC] mb-6">
          Share Files Securely
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Generate secure, expiring links for your files
        </p>

        {uploadedFiles.length === 0 ? (
          <p className="text-gray-500 text-center">No files uploaded yet.</p>
        ) : (
          <div className="bg-[#161B22] p-6 rounded-lg shadow-lg border border-gray-700">
            {/* File Selection */}
            <label className="block text-gray-400 mb-2 text-sm">Select File</label>
            <div className="flex items-center bg-gray-800 p-2 rounded-md">
              <FileText className="text-gray-400 mr-2" />
              <select
                value={selectedFile?.id}
                onChange={(e) => {
                  const file = uploadedFiles.find(f => f.id === e.target.value);
                  if (file) setSelectedFile(file);
                }}
                className="w-full bg-transparent text-white border-none outline-none"
              >
                {uploadedFiles.map((file) => (
                  <option key={file.id} value={file.id} className="bg-black text-white">
                    {file.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Link Expiry Time */}
            <label className="block text-gray-400 mt-4 text-sm">Link Expiry Time</label>
            <select
              value={expiryTime}
              onChange={(e) => setExpiryTime(e.target.value)}
              className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-600"
            >
              <option value="1 hour">1 hour</option>
              <option value="6 hours">6 hours</option>
              <option value="12 hours">12 hours</option>
              <option value="24 hours">24 hours</option>
              <option value="48 hours">48 hours</option>
            </select>

            {/* Secure Share Link */}
            <label className="block text-gray-400 mt-4 text-sm">Secure Share Link</label>
            <div className="flex items-center bg-gray-800 rounded-md p-3 mt-2">
              <Share2 className="text-gray-400 mr-3" />
              <input
                type="text"
                value={selectedFile ? `${window.location.origin}/download/${selectedFile.id}` : ""}
                readOnly
                className="bg-transparent text-white flex-1 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="bg-[#7D5AFF] text-white px-4 py-2 rounded-md hover:bg-[#5A3EFF] transition flex items-center"
              >
                {copied ? <Check className="text-green-500 mr-2" /> : <Copy className="mr-2" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* Expiry Notice */}
            <div className="mt-3 flex items-center text-gray-400">
              <Clock className="mr-2" />
              <span>This link will expire in {expiryTime}</span>
            </div>

            {/* Share Options */}
            <div className="mt-6 flex space-x-3">
              {/* Share via Gmail */}
              <button
                onClick={handleShareViaGmail}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center"
              >
                <Mail className="mr-2" /> Gmail
              </button>

              {/* Local Sharing */}
              <button
                onClick={handleLocalShare}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
              >
                <Send className="mr-2" /> Share Nearby
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePage;
