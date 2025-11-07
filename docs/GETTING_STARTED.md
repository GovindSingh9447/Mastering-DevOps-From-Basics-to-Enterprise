# 🚀 Getting Started with the Documentation Website

## Quick Start Guide

### 1. Start the Local Server

```bash
# Option 1: Use the provided script
cd docs
./start-server.sh

# Option 2: Use Python directly
cd docs
python3 -m http.server 8000

# Option 3: Use Node.js http-server
npm install -g http-server
cd docs
http-server -p 8000
```

### 2. Open in Browser

Navigate to: **http://localhost:8000**

### 3. Navigate the Website

- **Left Sidebar**: Click any module to load its content
- **Home Button**: Click "Home" in the sidebar to return to the homepage
- **Dark Mode**: Click the moon/sun icon in the top right
- **Mobile Menu**: Click the hamburger menu (☰) on mobile devices

## 📁 File Structure

```
docs/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # All styling
├── js/
│   ├── config.js          # Module configuration
│   └── app.js             # Main application logic
├── start-server.sh        # Server start script
├── README.md              # Documentation
└── GETTING_STARTED.md     # This file
```

## 🎨 Features

✅ **Responsive Design** - Works on all screen sizes  
✅ **Dark Mode** - Toggle between light/dark themes  
✅ **Module Navigation** - Easy access to all 11 modules  
✅ **Markdown Rendering** - Beautiful markdown rendering  
✅ **Syntax Highlighting** - Code blocks with syntax highlighting  
✅ **Print Friendly** - Optimized for printing  
✅ **Fast Loading** - Lightweight and optimized

## 🔧 Troubleshooting

### Module content not loading?

1. Check browser console (F12) for errors
2. Verify module paths in `js/config.js`
3. Ensure markdown files exist in module directories
4. Check CORS settings if using a local server

### Images not showing?

Images in markdown should use relative paths. The website automatically adjusts paths.

### Server not starting?

- Make sure Python is installed: `python3 --version`
- Try a different port: `python3 -m http.server 8080`
- Check if port is already in use

## 🌐 Deploy to GitHub Pages

1. Push `docs` folder to your repository
2. Go to **Settings → Pages**
3. Select **Source**: `Deploy from a branch`
4. Select **Branch**: `main` (or your default branch)
5. Select **Folder**: `/docs`
6. Click **Save**

Your website will be available at:

```
https://yourusername.github.io/Mastering-DevOps-From-Basics-to-Enterprise/
```

## 📝 Customization

### Add a New Module

Edit `js/config.js`:

```javascript
{
    id: 'module-xx',
    name: 'Module Name',
    path: '../Module XX: Module Name/README.md',
    category: 'Category Name',
    order: XX
}
```

### Change Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  /* ... */
}
```

### Modify Layout

All layout styles are in `css/style.css`. The website uses CSS Grid and Flexbox for responsive layouts.

## 🎯 Next Steps

1. ✅ Start the server and test locally
2. ✅ Verify all modules load correctly
3. ✅ Test on mobile devices
4. ✅ Deploy to GitHub Pages
5. ✅ Share with your audience!

---

**Happy Learning! 🚀**
