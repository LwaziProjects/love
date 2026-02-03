# 📸 EASY STEPS TO ADD PHOTOS FOR EVERYONE TO SEE

Follow these exact steps to add photos that everyone with the link can view:

## Step 1: Find Your Photos Folder
Navigate to: `c:\Users\0174988\Downloads\usefulstuff\valentines\photos\`

## Step 2: Add Your Photos
Copy or paste your image files into that `photos` folder. You can name them anything:
- `photo1.jpg`
- `beach.jpg`
- `memory_001.png`
- `us.jpg`
- etc.

Any image format works: `.jpg`, `.png`, `.gif`, `.webp`, `.svg`

## Step 3: Open Git Bash or Command Prompt
In the `valentines` folder, right-click and select:
- **"Git Bash Here"** (if you have Git installed)
- OR open regular Command Prompt

## Step 4: Run These Commands (One at a Time)

```bash
git add photos/
```
Press Enter. Then:

```bash
git commit -m "Add new photos"
```
Press Enter. Then:

```bash
git push origin main
```
Press Enter.

## Step 5: Done! 🎉
Visit the link: https://lwaziprojects.github.io/love/

Everyone with the link will now see your photos!

---

## Troubleshooting

**If you get an error saying "nothing to commit":**
- You haven't added any new photos to the folder yet
- Make sure you actually copied image files to the `photos` folder

**If photos still don't show:**
- Wait 2-3 minutes for GitHub to update
- Refresh the website (Ctrl+F5 or Cmd+Shift+R to hard refresh)
- Check your browser console for errors (Press F12)

**To remove a photo:**
```bash
git rm photos/photo_name.jpg
git commit -m "Remove photo"
git push origin main
```
