# 🚀 SETUP GUIDE: Enable Direct Photo Upload

This guide will set up the photo upload feature so anyone can click a button to upload photos without using Git commands.

## What You Need

1. **Node.js** installed (download from https://nodejs.org/)
2. **GitHub Personal Access Token** (free)
3. A hosting service (free options: Heroku, Railway, Render, or Vercel)

---

## Step 1: Create a GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name like "photo-upload"
4. Check these permissions:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token** (you'll use it next)

---

## Step 2: Set Up Environment Variables

1. Open the `valentines` folder
2. Create a file called `.env` (no extension)
3. Add this content:
```
GITHUB_TOKEN=paste_your_token_here
PORT=3000
```
Replace `paste_your_token_here` with the token from Step 1.

---

## Step 3: Install Dependencies

1. Open Command Prompt in the `valentines` folder
2. Run: `npm install`
3. This will download the necessary libraries

---

## Step 4: Test Locally (Optional)

1. In Command Prompt, run: `npm start`
2. The server will start on http://localhost:3000
3. Open your website in the browser
4. Test the upload button

---

## Step 5: Deploy to Free Hosting

### Option A: Deploy to Railway (Easiest) 🚂

1. Go to https://railway.app
2. Click "Start New Project"
3. Select "Deploy from GitHub"
4. Connect your GitHub account
5. Select the `love` repository
6. Add Environment Variable:
   - Name: `GITHUB_TOKEN`
   - Value: (paste your token from Step 1)
7. Click "Deploy"
8. Railway will give you a URL like `https://love-api-xxxx.railway.app`

### Option B: Deploy to Render 🎨

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub & select `love` repo
4. Settings:
   - Name: `love-api`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add Environment Variable:
   - `GITHUB_TOKEN` = (your token)
6. Create Web Service
7. Copy your service URL

### Option C: Deploy to Vercel (With serverless functions)

1. Go to https://vercel.com
2. Import your GitHub repository
3. Deploy

---

## Step 6: Update Your Website

Once deployed, update the API URL in your website:

1. Open `script.js`
2. Find the line: `const apiUrl = window.location.hostname === 'localhost'`
3. Replace `https://love-api.herokuapp.com/api/upload` with your deployed URL:
```javascript
const apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/upload' 
    : 'https://your-deployed-url.railway.app/api/upload';
```

---

## Step 7: Commit & Push

```bash
git add .
git commit -m "Add photo upload feature"
git push origin main
```

---

## How Users Upload Photos

Now anyone who visits the website can:

1. **Click the "📸 Click to Upload Photo" button**
2. **Select an image from their computer**
3. **Wait for confirmation** (✅ Photo uploaded!)
4. **The photo appears automatically** in the gallery for everyone!

---

## Troubleshooting

### "Upload failed" or "Make sure the server is running"
- Make sure your deployed server is running (check Railway/Render dashboard)
- Check that the API URL in `script.js` is correct

### Token doesn't work
- Go back to https://github.com/settings/tokens
- Make sure the token has `repo` permission
- The token must not be expired

### Photos not appearing
- Wait 5-10 seconds and refresh the page
- Check browser console (F12) for errors
- Make sure GitHub token has write access to the repository

---

## What Happens When Someone Uploads?

1. User clicks button and selects an image
2. Image is sent to your server
3. Server converts image to base64
4. Server commits image to GitHub `/photos` folder
5. Website automatically loads new photos from GitHub
6. Everyone with the link sees the new photo instantly! 📸

That's it! You now have a fully automated photo sharing system! 🎉
