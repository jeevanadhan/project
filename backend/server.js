const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); // Generate unique IDs

const PORT = process.env.PORT || 5001;
const app = express();

app.use(cors());
app.use(express.json());

// Ensure "uploads" folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Automatically delete expired files every 5 minutes
setInterval(async () => {
    const now = new Date();
    const expiredFiles = await File.find({ expiresAt: { $lt: now } });

    expiredFiles.forEach(async (file) => {
        try {
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path); // Delete file from disk
            }
            await File.deleteOne({ id: file.id }); // Remove from DB
        } catch (error) {
            console.error(`Error deleting file ${file.id}:`, error);
        }
    });

    console.log(`✅ Deleted ${expiredFiles.length} expired files.`);
}, 5 * 60 * 1000); // Runs every 5 minutes


// ✅ Serve uploaded files as static resources
app.use("/uploads", express.static(uploadDir));

// ✅ Setup Multer for file uploads (prevent overwriting files)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const sanitizedFilename = file.originalname.replace(/\s+/g, "_"); // Remove spaces
        cb(null, `${uniqueSuffix}-${sanitizedFilename}`);
    }
});

const upload = multer({ storage });

// ✅ Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/filesharing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout if MongoDB is not reachable
});

// ✅ Define File Schema
const fileSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    path: String, 
    expiresAt: Date, 
});

const File = mongoose.model("File", fileSchema);

// ✅ API to upload a file
app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File received:", req.file);

        const expiresIn = parseInt(req.body.expiresIn) || 10; // Default: 10 min
        const expiryDate = new Date(Date.now() + expiresIn * 60 * 1000);

        const fileId = uuidv4(); // Generate unique ID for each file

        const newFile = new File({
            id: fileId,
            name: req.file.filename,
            path: req.file.path,
            expiresAt: expiryDate
        });

        await newFile.save();
        res.json({ message: "File uploaded successfully", id: fileId, filename: req.file.filename });
    } catch (error) {
        console.error("Upload failed:", error);
        res.status(500).json({ error: "Upload failed", details: error.message });
    }
});

// ✅ API to download a file
app.get("/download/:id", async (req, res) => {
    try {
        const fileRecord = await File.findOne({ id: req.params.id });

        if (!fileRecord) {
            return res.status(404).json({ error: "File not found" });
        }

        const filePath = path.join(__dirname, fileRecord.path);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found on server" });
        }

        res.download(filePath);
    } catch (error) {
        console.error("Download failed:", error);
        res.status(500).json({ error: "Download failed", details: error.message });
    }
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
