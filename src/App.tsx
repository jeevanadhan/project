import { Routes, Route } from "react-router-dom"; // Do NOT import BrowserRouter here
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import SharePage from "./pages/SharePage";
import SignInPage from "./pages/signin";
import HowItWorksPage from "./pages/HowItWorksPage";
import DownloadPage from "./pages/DownloadPage";


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/download/:fileId" element={<DownloadPage />} />
      </Routes>
    </div>
  );
}

export default App;
