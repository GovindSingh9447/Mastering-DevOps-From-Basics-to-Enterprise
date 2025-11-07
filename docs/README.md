# 📖 DevOps Documentation Website

A modern, responsive documentation website for the Mastering DevOps learning repository.

## 🚀 Features

- **📱 Responsive Design** - Works on desktop, tablet, and mobile devices
- **🌙 Dark Mode** - Toggle between light and dark themes
- **📑 Module Navigation** - Easy navigation through all 11 modules
- **🔍 Search Ready** - SEO-optimized structure
- **⚡ Fast Loading** - Lightweight and optimized
- **🎨 Modern UI** - Clean, professional interface

## 📁 Structure

```
docs/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # Stylesheet
├── js/
│   ├── config.js      # Module configuration
│   └── app.js         # Application logic
└── README.md          # This file
```

## 🛠️ Setup & Usage

### Option 1: Local Development Server (Recommended)

**Important:** The server must be run from the repository **root directory**, not from the `docs` folder, so that module files can be accessed.

#### Using the provided script (Easiest):

```bash
# From repository root
./start-docs-server.sh
```

Then open: `http://localhost:8000/docs/`

#### Using Python 3 manually:

```bash
# From repository root (not docs folder!)
python3 -m http.server 8000
```

Then open: `http://localhost:8000/docs/`

#### Using Python 2:

```bash
# From repository root
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000/docs/`

#### Using Node.js (http-server):

```bash
npm install -g http-server
# From repository root
http-server -p 8000
```

Then open: `http://localhost:8000/docs/`

### Option 2: GitHub Pages

1. Push the `docs` folder to your repository
2. Go to repository Settings → Pages
3. Select source: `Deploy from a branch`
4. Select branch: `main` (or your default branch)
5. Select folder: `/docs`
6. Click Save

Your website will be available at:

```
https://yourusername.github.io/Mastering-DevOps-From-Basics-to-Enterprise/
```

### Option 3: Direct File Opening

You can also open `index.html` directly in your browser, but note that some features (like loading markdown files) may not work due to browser security restrictions (CORS).

## 📝 Configuration

To add or modify modules, edit `js/config.js`:

```javascript
{
    id: 'module-xx',
    name: 'Module Name',
    path: '../Module XX: Module Name/README.md',
    category: 'Category Name',
    order: XX
}
```

## 🎨 Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  /* ... more variables ... */
}
```

### Styling

All styles are in `css/style.css`. The website uses CSS variables for easy theming.

## 🔧 Troubleshooting

### Module content not loading

1. Check that the module path in `config.js` is correct
2. Ensure the markdown file exists at the specified path
3. Check browser console for errors (F12)
4. Verify CORS settings if using a local server

### Images not displaying

Images in markdown files should use relative paths from the module directory. The website automatically adjusts image paths.

### Dark mode not saving

Dark mode preference is saved in localStorage. Clear browser cache if issues persist.

## 📚 Dependencies

- [Marked.js](https://marked.js.org/) - Markdown parser
- [Highlight.js](https://highlightjs.org/) - Syntax highlighting
- [Font Awesome](https://fontawesome.com/) - Icons

All dependencies are loaded via CDN, so no installation is required.

## 🤝 Contributing

To contribute improvements:

1. Fork the repository
2. Make your changes
3. Test locally
4. Submit a pull request

## 📄 License

Same license as the main repository (MIT).

---

**Note**: This website is designed to work with the module structure of the Mastering DevOps repository. Ensure all module README files exist before deploying.
