const { Octokit } = require('@octokit/rest');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { fileContent, fileName } = req.body;

        if (!fileContent || !fileName) {
            return res.status(400).json({ error: 'Missing file data' });
        }

        // Initialize GitHub API
        const octokit = new Octokit({
            auth: process.env.GITHUB_TOKEN
        });

        const REPO_OWNER = 'LwaziProjects';
        const REPO_NAME = 'love';
        const BRANCH = 'main';
        const filePath = `photos/${Date.now()}_${fileName}`;

        // Remove data URL prefix if present
        const base64Content = fileContent.replace(/^data:image\/\w+;base64,/, '');

        // Upload to GitHub
        await octokit.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: filePath,
            message: `Add photo: ${fileName}`,
            content: base64Content,
            branch: BRANCH
        });

        return res.status(200).json({
            success: true,
            message: 'Photo uploaded successfully!',
            fileUrl: `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${filePath}`
        });
    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ error: error.message });
    }
};
