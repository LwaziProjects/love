# 📸 How to Add Photos (Visible to Everyone)

Photos are now stored in the GitHub repository and will be visible to **everyone** who visits the website link!

## Quick Steps:

### Step 1: Prepare Your Photos
1. You can add photos directly to the `photos/` folder on your computer
2. Name them: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
3. You can also use:
   - `photo1.png`, `photo1.jpeg`, `photo2.gif` (any image format)
   - Or give them any name like `memory1.jpg`, `beach.png`, etc.

### Step 2: Save Photos to the Folder
Copy your images to: `c:\Users\0174988\Downloads\usefulstuff\valentines\photos\`

### Step 3: Upload to GitHub
Open a terminal in the `valentines` folder and run:

```bash
# Stage all photos
git add photos/

# Commit the photos
git commit -m "Add more beautiful memories"

# Push to GitHub
git push origin main
```

That's it! The photos will now be **visible to everyone** who visits:
🔗 https://lwaziprojects.github.io/love/

## Important Notes:

✅ **Public Photos**: Once you commit photos to GitHub, they will be visible in your repository and on the website

✅ **Anyone Can See**: Anyone with the link can view the website and all the photos

✅ **Always Available**: Unlike the old system, the photos persist across page reloads and for all visitors

❌ **Won't Delete Locally**: If you delete a photo from the website, it will still be in git history. To truly remove it, use:
```bash
git rm photos/unwanted_photo.jpg
git commit -m "Remove photo"
git push
```

## Browser Preview (Before Uploading):
You can also preview how photos look by:
1. Adding them through the website UI
2. They'll show temporarily in the browser
3. Then follow Step 3 above to make them permanent and visible to everyone

## Troubleshooting:

**Photos not showing?**
- Make sure the file names match: `photoN.jpg`, `photoN.png`, etc. (for preset slots)
- Or wait 5-10 minutes for GitHub to update
- Clear browser cache (Ctrl+F5)

**Want to remove a photo later?**
- Delete it from the `photos/` folder
- Run: `git add photos/` and `git commit -m "Remove photo"` 
- Then `git push`

---

**The website will automatically load all photos from the `photos/` folder in your GitHub repository!**
