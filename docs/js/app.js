// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  renderNavigation();
  renderModulesGrid();
  setupEventListeners();
  loadInitialContent();

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    headerPrefix: '',
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(code, { language: lang }).value;
        } catch (err) {
          console.error('Highlighting error:', err);
        }
      }
      return hljs.highlightAuto(code).value;
    },
  });

  // Handle hash navigation on page load
  window.addEventListener('hashchange', handleHashNavigation);
  
  // Check for hash on initial load
  if (window.location.hash) {
    setTimeout(handleHashNavigation, 100);
  }
}

function renderNavigation() {
  const navList = document.getElementById('navList');
  navList.innerHTML = '';

  // Add Home link
  const homeItem = document.createElement('li');
  homeItem.className = 'nav-item';
  homeItem.innerHTML =
    '<a href="#" class="nav-link" onclick="loadModule(\'home\'); return false;">🏠 Home</a>';
  navList.appendChild(homeItem);

  // Render modules by category
  Object.keys(modulesByCategory).forEach((category) => {
    const categoryHeader = document.createElement('li');
    categoryHeader.className = 'nav-item';
    categoryHeader.innerHTML = `<div class="nav-section-title" style="margin-top: 1rem;">${category}</div>`;
    navList.appendChild(categoryHeader);

    modulesByCategory[category].forEach((module) => {
      const listItem = document.createElement('li');
      listItem.className = 'nav-item';
      listItem.innerHTML = `
                <a href="#" class="nav-link" onclick="loadModule('${module.id}'); return false;">
                    ${module.order}. ${module.name}
                </a>
            `;
      navList.appendChild(listItem);
    });
  });
}

function renderModulesGrid() {
  const modulesGrid = document.getElementById('modulesGrid');
  modulesGrid.innerHTML = '';

  Object.keys(modulesByCategory).forEach((category) => {
    const categoryTitle = document.createElement('h3');
    categoryTitle.style.marginTop = '2rem';
    categoryTitle.style.marginBottom = '1rem';
    categoryTitle.style.color = 'var(--text-color)';
    categoryTitle.textContent = category;
    modulesGrid.appendChild(categoryTitle);

    modulesByCategory[category].forEach((module) => {
      const card = document.createElement('div');
      card.className = 'module-card';
      card.innerHTML = `
                <h3>${module.order}. ${module.name}</h3>
                <p>Click to view module content</p>
            `;
      card.onclick = () => loadModule(module.id);
      modulesGrid.appendChild(card);
    });
  });
}

function setupEventListeners() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const sidebar = document.getElementById('sidebar');

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('open');
    }
  });
}

function loadInitialContent() {
  // Load home content by default
  loadModule('home');
}

async function loadModule(moduleId) {
  const contentBody = document.getElementById('contentBody');
  const homeContent = document.getElementById('homeContent');
  const moduleContent = document.getElementById('moduleContent');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const breadcrumb = document.getElementById('breadcrumb');

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.remove('active');
  });

  // Close mobile menu
  const sidebar = document.getElementById('sidebar');
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }

  if (moduleId === 'home') {
    homeContent.style.display = 'block';
    moduleContent.style.display = 'none';
    breadcrumb.innerHTML =
      '<a href="#" onclick="loadModule(\'home\')">Home</a>';
    return;
  }

  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    console.error('Module not found:', moduleId);
    return;
  }

  // Show loading spinner
  loadingSpinner.style.display = 'block';
  homeContent.style.display = 'none';
  moduleContent.style.display = 'none';

  try {
    // Update breadcrumb
    breadcrumb.innerHTML = `
            <a href="#" onclick="loadModule('home')">Home</a> / 
            <span>${module.name}</span>
        `;

    // Mark active nav link
    document.querySelectorAll('.nav-link').forEach((link) => {
      if (link.textContent.includes(module.order)) {
        link.classList.add('active');
      }
    });

    // Fetch and render module content
    // Properly encode path segments to handle spaces and special characters
    function encodePath(path) {
      // Split path and encode each segment except relative navigation (../)
      return path
        .split('/')
        .map((segment, index, array) => {
          // Keep relative navigation as-is
          if (segment === '..' || segment === '.') {
            return segment;
          }
          // Encode the segment
          return encodeURIComponent(segment);
        })
        .join('/');
    }

    const encodedPath = encodePath(module.path);
    let response = await fetch(encodedPath);

    // Try alternative paths if main path fails
    if (!response.ok && module.altPaths) {
      for (const altPath of module.altPaths) {
        const encodedAltPath = encodePath(altPath);
        response = await fetch(encodedAltPath);
        if (response.ok) {
          module.path = altPath; // Update path for future use
          break;
        }
      }
    }

    if (!response.ok) {
      console.error('Failed to fetch module:', {
        path: module.path,
        encodedPath: encodedPath,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
      throw new Error(
        `Failed to load module: ${response.status} ${response.statusText}`
      );
    }

    const markdown = await response.text();
    const html = marked.parse(markdown);

    moduleContent.innerHTML = html;

    // Process headings to ensure they have IDs for anchor navigation
    processHeadings(moduleContent);

    // Highlight code blocks
    moduleContent.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });

    // Fix image paths
    moduleContent.querySelectorAll('img').forEach((img) => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('//')) {
        // Convert relative paths to absolute from module directory
        const moduleDir = module.path.substring(
          0,
          module.path.lastIndexOf('/')
        );
        img.src = `${moduleDir}/${src}`;
      }
    });

    // Process anchor links for smooth scrolling
    processAnchorLinks(moduleContent);

    // Fix internal markdown file links
    moduleContent.querySelectorAll('a').forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('./') && href.endsWith('.md')) {
        // Convert markdown links to module links if needed
        link.onclick = (e) => {
          e.preventDefault();
          // You can implement navigation to other modules here
        };
      }
    });

    homeContent.style.display = 'none';
    moduleContent.style.display = 'block';

    // Handle hash navigation after content is loaded
    setTimeout(() => {
      if (window.location.hash) {
        handleHashNavigation();
      } else {
        // Scroll to top if no hash
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  } catch (error) {
    console.error('Error loading module:', error);
    moduleContent.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h2>❌ Error Loading Module</h2>
                <p>Failed to load module content. Please try again later.</p>
                <p style="color: var(--text-secondary); font-size: 0.875rem;">${error.message}</p>
                <button onclick="loadModule('home')" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--primary-color); color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                    Return to Home
                </button>
            </div>
        `;
    moduleContent.style.display = 'block';
  } finally {
    loadingSpinner.style.display = 'none';
  }
}

function toggleDarkMode() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);

  // Update icon
  const darkModeIcon = document.getElementById('darkModeIcon');
  if (newTheme === 'dark') {
    darkModeIcon.className = 'fas fa-sun';
  } else {
    darkModeIcon.className = 'fas fa-moon';
  }

  // Save preference
  localStorage.setItem('theme', newTheme);
}

function printContent() {
  window.print();
}

// Load saved theme preference
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const darkModeIcon = document.getElementById('darkModeIcon');
  if (savedTheme === 'dark') {
    darkModeIcon.className = 'fas fa-sun';
  }
});
