const express = require('express');
const multer = require('multer');
const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

// Initialize GitHub API
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

const REPO_OWNER = 'LwaziProjects';
const REPO_NAME = 'love';
const BRANCH = 'main';

// Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Photo upload endpoint
app.post('/api/upload', upload.single('photo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the uploaded file
        const fileContent = fs.readFileSync(req.file.path);
        const base64Content = fileContent.toString('base64');
        const fileName = `${Date.now()}_${req.file.originalname}`;
        const filePath = `photos/${fileName}`;

        // Get current file SHA if it exists (for updates)
        let sha = undefined;
        try {
            const existingFile = await octokit.repos.getContent({
                owner: REPO_OWNER,
                repo: REPO_NAME,
                path: filePath,
                branch: BRANCH
            });
            sha = existingFile.data.sha;
        } catch (error) {
            // File doesn't exist yet, which is fine
        }

        // Upload to GitHub
        const response = await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: filePath,
            message: `Add photo: ${req.file.originalname}`,
            content: base64Content,
            branch: BRANCH,
            ...(sha && { sha })
        });

        // Clean up temp file
        fs.unlinkSync(req.file.path);

        return res.json({
            success: true,
            message: 'Photo uploaded successfully!',
            fileUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filePath}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        // Clean up temp file
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        return res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
