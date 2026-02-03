# 💕 Our Love Story Website 💕

A beautiful, interactive website to celebrate your love journey. Host it on GitHub Pages with complete privacy for your personal photos.

## Features ✨

- **Beautiful Love Story Section** - Share your unique journey together with an interactive timeline
- **Private Photo Gallery** - Display your memories (photos kept completely private, not visible on GitHub)
- **Animated Hearts** - Continuously floating and bursting hearts throughout the page
- **Interactive Effects** - Click anywhere for heart bursts, press Space/Enter for surprises
- **Smooth Animations** - Heartbeat effects, floating elements, and pulsing animations
- **Fully Responsive** - Looks beautiful on desktop, tablet, and mobile
- **Rotating Love Quotes** - 15 beautiful romantic quotes
- **Glassmorphism UI** - Modern frosted glass effect on all cards

## How to Add Your Photos (Keeping Them Private!)

### Important: Photos Are NOT Visible on GitHub ✅

The `.gitignore` file is already configured to keep all photos private:
- Photos in the `photos/` folder will **never** be committed to GitHub
- Only you and people you share the link with can see them
- When you push to GitHub, photos stay on your computer only

### Step 1: Add Your Photos

1. Open the `photos/` folder in your project
2. Add your photos there (supports `.jpg`, `.jpeg`, `.png`, `.gif`)
3. Rename them in order: 
   - `photo1.jpg`
   - `photo2.jpg`
   - `photo3.jpg`
   - etc.

### Step 2: Local Preview

The website will automatically load and display your photos when you open it locally!

- Open `index.html` in your browser
- Your photos will appear in the "Our Beautiful Memories" section
- Click any photo to view in a beautiful lightbox gallery

### Step 3: Share Safely

When you push to GitHub:
```bash
git add .
git commit -m "Add love story website"
git push origin main
```

✅ **Your website files go to GitHub**
✅ **Your photos stay on your computer**
✅ **Only you control who sees your memories**

## Files

- `index.html` - Main HTML structure with your love story
- `styles.css` - Beautiful styling and animations
- `script.js` - Interactive functionality and photo gallery
- `.gitignore` - Keeps photos and personal files private
- `photos/` - Your private photo folder (not visible on GitHub)
- `README.md` - This file

## How to Customize

### 1. Update Your Love Story
Open `index.html` and modify the story section:

```html
<div class="story-point">
    <span class="story-icon">🏫</span>
    <div class="story-text">
        <h3>Your Title Here</h3>
        <p>Your story here...</p>
    </div>
</div>
```

### 2. Customize the Main Message
Find and edit the main message card:

```html
<p class="message">
    Your personal message here...
</p>
```

### 3. Change Colors
Edit the color scheme in `styles.css`:

```css
body {
    background: linear-gradient(135deg, #0f0000 0%, #2d0a3f 50%, #660066 100%);
}
```

Popular color combinations:
- Romantic Red: `#8B0000`, `#FF1744`, `#FF69B4`
- Ocean Blue: `#001f3f`, `#0074D9`, `#FF4136`
- Sunset Orange: `#FF6600`, `#FF9900`, `#FFB3D9`

### 4. Add More Reasons/Details
The "Reasons Why I Love You" section uses a grid - add more items:

```html
<div class="reason-item">
    <span class="reason-emoji">💕</span>
    <span class="reason-text">Your custom reason</span>
</div>
```

### 5. Update Promises
Edit or add more promises in the promise section.

### 6. Personalize with JavaScript
In `script.js`, call this function to personalize:

```javascript
personalizeMessage("Their Name");
```

## Photo Gallery Features

### Viewing Photos
- **Click a photo** - Opens in beautiful lightbox viewer
- **Arrow keys** - Navigate between photos (left/right)
- **Click arrows** - Previous/next photo
- **Press Escape** - Close lightbox
- **Counter** - Shows current photo position

### Supported Formats
- `.jpg` / `.jpeg`
- `.png`
- `.gif`

## Interactions

- **Click Anywhere** - Creates heart bursts at your cursor
- **Double-Click** - Triggers sparkle effect
- **Press SPACE** - Rose flower burst
- **Press ENTER** - Large heart explosion
- **Type "love"** - Easter egg effect!
- **Buttons** - Various romantic effects

## How to Host on GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name your repository (e.g., `love-letter`, `our-story`)
3. Make it **Public** (so it's accessible online)
4. Click "Create repository"

### Step 2: Upload Your Files
Using Git command line:

```bash
git clone https://github.com/yourusername/repository-name.git
cd repository-name

# Copy index.html, styles.css, script.js here
# Add your photos to photos/ folder (optional)

git add .
git commit -m "Add our beautiful love story"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** section
4. Under "Branch", select **main** and **/root**
5. Click **Save**

Your site will be live at:
```
https://yourusername.github.io/repository-name
```

## Privacy & Security

✅ **What's visible on GitHub:**
- HTML, CSS, JavaScript files
- Your love story text
- Website design and features

🔒 **What's NOT visible on GitHub:**
- Photos in the `photos/` folder
- Any files listed in `.gitignore`
- Personal image files

This means your memories are safe and only visible to people who visit your shared link!

## Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge (90+)
- ✅ Firefox (88+)
- ✅ Safari (14+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Tips for Extra Magic

### Add Background Music
Add before `</body>` in `index.html`:

```html
<audio autoplay loop>
    <source src="song.mp3" type="audio/mpeg">
</audio>
```

### Add a Profile Photo
Add in the main card:

```html
<img src="photos/profile.jpg" alt="Us Together" 
     style="width: 200px; border-radius: 50%; margin: 20px 0; border: 3px solid #ff69b4;">
```

### Add More Love Quotes
Edit the `loveQuotes` array in `script.js`:

```javascript
{ quote: "Your custom quote here", author: "Author Name" },
```

### Create a Photo Slideshow
Modify `script.js` to automatically rotate through photos on page load.

## Future Enhancements

- Countdown timer to a special date
- Message from your partner (hidden Easter egg)
- Timeline of your relationship milestones
- Love letter that appears on click
- Playlist of songs that remind you of them
- Matching game with your photos
- Memory map showing places you've been together

## Troubleshooting

### Photos not showing?
1. Make sure photos are in the `photos/` folder
2. Name them: `photo1.jpg`, `photo2.jpg`, etc.
3. Refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console for errors (F12)

### Website not loading on GitHub?
1. Check that repository is **Public**
2. Verify GitHub Pages is enabled in Settings > Pages
3. Wait 1-2 minutes after enabling (GitHub needs time to deploy)
4. Check the URL: `https://yourusername.github.io/repo-name`

### Styling looks wrong?
1. Hard refresh the page (Ctrl+Shift+R)
2. Clear browser cache
3. Check that all files are properly uploaded

## Questions?

Feel free to customize this website however you'd like!

---

**Made with ❤️ for your special someone!**

Remember: This website is yours to personalize. Make it reflect your unique love story! 💕

---

### Sharing Your Website

**Share the link with your loved one:**
- Send them: `https://yourusername.github.io/repository-name`
- They can view it anytime, anywhere
- No installation needed
- Works on phones and computers

**Email Template:**
```
Hey, I made something special for you! 
Check it out here: https://yourusername.github.io/repository-name
💕
```

Happy sharing! 🎉
#   l o v e  
 