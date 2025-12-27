# Dashboard Card Design

A responsive, interactive dashboard design optimized for mobile and desktop viewing.

## Features

- **Mobile-First Responsive Design** - Fully optimized for phones, tablets, and desktop
- **Dynamic Date/Time** - Automatically updates to show current date and time
- **Interactive Navigation** - Click navigation items to switch dashboard views
- **Week Selector** - Dropdown to filter transactions by time period
- **Update Button** - Refresh dashboard data with visual feedback
- **Transaction Filters** - Filter by All, Revenue, or Expenses
- **Smooth Animations** - Modern UI with hover effects and transitions

## View on Your Mobile Device Using GitHub Pages

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/gutsodogwu/card-design`
2. Click on **Settings** (top navigation)
3. Scroll down and click on **Pages** (left sidebar)
4. Under **Source**, select the branch you want to deploy (e.g., `main` or `claude/implement-todo-item-S1TGA`)
5. Click **Save**

### Step 2: Wait for Deployment

- GitHub will take 1-2 minutes to build and deploy your site
- You'll see a message: "Your site is ready to be published at `https://gutsodogwu.github.io/card-design/`"

### Step 3: Access on Your Phone

1. Open your mobile browser (Safari, Chrome, etc.)
2. Navigate to: `https://gutsodogwu.github.io/card-design/`
3. Add the page to your home screen for easy access:
   - **iPhone**: Tap the Share button → "Add to Home Screen"
   - **Android**: Tap the menu (⋮) → "Add to Home screen"

### Step 4: View Specific File

If you want to view the dashboard directly, use:
```
https://gutsodogwu.github.io/card-design/card.html
```

## Alternative: Using GitHub Raw Files (Temporary)

If you need immediate access before setting up GitHub Pages:

1. Navigate to `card.html` on GitHub
2. Click **Raw** button
3. Copy the URL (will be something like `https://raw.githubusercontent.com/gutsodogwu/card-design/...`)
4. Open in mobile browser

**Note**: This method won't load CSS/JS properly, so GitHub Pages is recommended.

## Local Development

To test locally:

1. Clone the repository
   ```bash
   git clone https://github.com/gutsodogwu/card-design.git
   cd card-design
   ```

2. Open `card.html` in your browser, or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (npx)
   npx http-server
   ```

3. Visit `http://localhost:8000/card.html`

## File Structure

```
card-design/
├── card.html       # Main HTML structure
├── card.css        # Styles with mobile responsiveness
├── card.js         # Interactive functionality
├── 32037470.jpg    # Profile image
└── README.md       # This file
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Android)
- Responsive breakpoints: 768px (tablet) and 480px (mobile)

## Technologies Used

- HTML5
- CSS3 (Flexbox, Media Queries)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Iconify Icons
- Google Fonts (Outfit)
