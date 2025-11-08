// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

// Get base path for GitHub Pages (repository name in URL)
function getBasePath() {
  const pathname = window.location.pathname;
  const hostname = window.location.hostname;
  const href = window.location.href;

  // Check if we're on GitHub Pages (github.io domain)
  const isGitHubPages = hostname.includes('github.io');

  if (isGitHubPages) {
    // Try multiple methods to detect the base path

    // Method 1: Extract from pathname (most reliable)
    // For: https://username.github.io/repo-name/ -> /repo-name/
    const pathParts = pathname.split('/').filter((p) => p);
    if (pathParts.length > 0 && pathParts[0] !== 'index.html') {
      const repoName = pathParts[0];
      console.log('Detected repo name from pathname:', repoName);
      return '/' + repoName + '/';
    }

    // Method 2: Extract from full URL
    // For: https://username.github.io/repo-name/ -> /repo-name/
    const urlMatch = href.match(/github\.io\/([^/]+)/);
    if (urlMatch && urlMatch[1]) {
      console.log('Detected repo name from URL:', urlMatch[1]);
      return '/' + urlMatch[1] + '/';
    }

    // Method 3: Try to get from script src (fallback)
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
      if (script.src && script.src.includes('github.io')) {
        const scriptMatch = script.src.match(/github\.io\/([^/]+)/);
        if (scriptMatch && scriptMatch[1]) {
          console.log('Detected repo name from script src:', scriptMatch[1]);
          return '/' + scriptMatch[1] + '/';
        }
      }
    }
  }

  // For local development or custom domain, return root
  console.log('Using root path (local or custom domain)');
  return '/';
}

// Store base path globally - calculate it after DOM is ready
let BASE_PATH = '/';

// Initialize base path after page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    BASE_PATH = getBasePath();
    console.log('Base path initialized:', BASE_PATH);
  });
} else {
  BASE_PATH = getBasePath();
  console.log('Base path initialized (immediate):', BASE_PATH);
}

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
  const mobileOverlay = document.getElementById('mobileOverlay');

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    if (mobileOverlay) {
      mobileOverlay.classList.toggle(
        'active',
        sidebar.classList.contains('open')
      );
    }
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleSidebar);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) {
        toggleSidebar();
      }
    });
  }

  // Close sidebar on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      toggleSidebar();
    }
  });

  // Prevent body scroll when sidebar is open on mobile
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        if (sidebar.classList.contains('open')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }
    });
  });

  observer.observe(sidebar, { attributes: true });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (sidebar.classList.contains('open')) {
        toggleSidebar();
      }
    }
  });
}

function loadInitialContent() {
  // Load home content by default
  loadModule('home');
}

async function loadModule(moduleId, fileIndex = 0) {
  const contentBody = document.getElementById('contentBody');
  const homeContent = document.getElementById('homeContent');
  const moduleContent = document.getElementById('moduleContent');
  const moduleFileTabs = document.getElementById('moduleFileTabs');
  const loadingSpinner = document.getElementById('loadingSpinner');
  const breadcrumb = document.getElementById('breadcrumb');

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.remove('active');
  });

  // Close mobile menu
  const sidebar = document.getElementById('sidebar');
  const mobileOverlay = document.getElementById('mobileOverlay');
  if (window.innerWidth <= 768 && sidebar) {
    sidebar.classList.remove('open');
    if (mobileOverlay) {
      mobileOverlay.classList.remove('active');
    }
    document.body.style.overflow = '';
  }

  if (moduleId === 'home') {
    homeContent.style.display = 'block';
    moduleContent.style.display = 'none';
    moduleFileTabs.style.display = 'none';
    breadcrumb.innerHTML =
      '<a href="#" onclick="loadModule(\'home\')">Home</a>';
    return;
  }

  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    console.error('Module not found:', moduleId);
    return;
  }

  // Handle modules with multiple files
  let fileToLoad = module.path;
  if (module.files && module.files.length > 0) {
    // Show file tabs
    renderModuleFileTabs(module, fileIndex);
    moduleFileTabs.style.display = 'flex';
    
    // Load the selected file
    if (module.files[fileIndex]) {
      fileToLoad = module.files[fileIndex].path;
    }
  } else {
    // Hide file tabs for modules without multiple files
    moduleFileTabs.style.display = 'none';
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
      // Remove leading ./ if present
      let cleanPath = path.replace(/^\.\//, '');

      // Encode the module path segments
      const encodedModulePath = cleanPath
        .split('/')
        .map((segment) => {
          // Skip empty segments
          if (!segment) return segment;
          // Encode the segment to handle spaces and special characters
          return encodeURIComponent(segment);
        })
        .join('/');

      // Build full path with base path (don't encode base path, it's already a URL path)
      return BASE_PATH === '/'
        ? encodedModulePath
        : BASE_PATH + encodedModulePath;
    }

    const encodedPath = encodePath(fileToLoad);
    let response = await fetch(encodedPath);

    console.log('Attempting to fetch:', encodedPath);

    // Try alternative paths if main path fails
    if (!response.ok && module.altPaths) {
      console.log('Trying alternative paths...');
      for (const altPath of module.altPaths) {
        const encodedAltPath = encodePath(altPath);
        console.log('Trying alternative:', encodedAltPath);
        response = await fetch(encodedAltPath);
        if (response.ok) {
          module.path = altPath; // Update path for future use
          console.log('Success with alternative path');
          break;
        }
      }
    }

    // If still failing on GitHub Pages, try different base path variations
    if (!response.ok && BASE_PATH !== '/') {
      console.log('Trying path variations for GitHub Pages...');

      // Try 1: Without leading slash in module path
      const pathVariation1 =
        BASE_PATH +
        module.path
          .replace(/^\.\//, '')
          .split('/')
          .map((s) => (s ? encodeURIComponent(s) : s))
          .join('/');
      console.log('Trying variation 1:', pathVariation1);
      response = await fetch(pathVariation1);

      // Try 2: With ../ relative path
      if (!response.ok) {
        const pathVariation2 =
          BASE_PATH.replace(/\/$/, '') +
          '/../' +
          module.path
            .replace(/^\.\//, '')
            .split('/')
            .map((s) => (s ? encodeURIComponent(s) : s))
            .join('/');
        console.log('Trying variation 2:', pathVariation2);
        response = await fetch(pathVariation2);
      }

      // Try 3: Just the module path (absolute from root)
      if (!response.ok) {
        const pathVariation3 =
          '/' +
          module.path
            .replace(/^\.\//, '')
            .split('/')
            .map((s) => (s ? encodeURIComponent(s) : s))
            .join('/');
        console.log('Trying variation 3:', pathVariation3);
        response = await fetch(pathVariation3);
      }

      // Try 4: Re-detect BASE_PATH and try again (in case it wasn't set correctly)
      if (!response.ok) {
        const newBasePath = getBasePath();
        if (newBasePath !== BASE_PATH) {
          console.log('Base path changed, retrying with:', newBasePath);
          BASE_PATH = newBasePath;
          const retryPath =
            BASE_PATH +
            module.path
              .replace(/^\.\//, '')
              .split('/')
              .map((s) => (s ? encodeURIComponent(s) : s))
              .join('/');
          console.log('Retrying with new base path:', retryPath);
          response = await fetch(retryPath);
        }
      }
    }

    // Final fallback: try without base path (for local development)
    if (!response.ok) {
      const localPath = module.path.replace(/^\.\//, '');
      const encodedLocalPath = localPath
        .split('/')
        .map((segment) => (segment ? encodeURIComponent(segment) : segment))
        .join('/');
      console.log('Trying local path:', encodedLocalPath);
      response = await fetch(encodedLocalPath);
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
        // Build full path with base path
        const cleanModuleDir = moduleDir.replace(/^\.\//, '');
        const fullModuleDir =
          BASE_PATH === '/' ? cleanModuleDir : BASE_PATH + cleanModuleDir;
        img.src = `${fullModuleDir}/${src}`;
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

// Process headings to ensure they have proper IDs for anchor navigation
function processHeadings(container) {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headings.forEach((heading) => {
    // Generate ID from heading text that matches common markdown TOC formats
    const text = heading.textContent.trim();

    // Create a slug that matches GitHub-style markdown TOC links
    // Handles numbered lists like "3. AWS CloudFormation & CDK" -> "3-aws-cloudformation--cdk"
    let id = text
      .toLowerCase()
      .replace(/^\d+\.\s*/, '') // Remove leading numbers with dots (e.g., "3. ")
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

    // If the original heading had a number prefix, try to preserve it in the ID
    const numberMatch = text.match(/^(\d+)\./);
    if (numberMatch && id) {
      id = `${numberMatch[1]}-${id}`;
    }

    // Use existing ID if it exists and looks valid, otherwise use generated one
    if (!heading.id || heading.id.length === 0) {
      heading.id = id || `heading-${Math.random().toString(36).substr(2, 9)}`;
    }

    // Ensure the heading has proper scroll margin (also handled in CSS)
  });
}

// Process anchor links to enable smooth scrolling
function processAnchorLinks(container) {
  const links = container.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    // Remove any existing event listeners by cloning
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);

    newLink.addEventListener('click', (e) => {
      const href = newLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();

        const targetId = href.substring(1); // Remove the #
        let targetElement = document.getElementById(targetId);

        // Try URL decoded version
        if (!targetElement) {
          const decodedId = decodeURIComponent(targetId);
          targetElement = document.getElementById(decodedId);
        }

        // Try to find by partial match
        if (!targetElement) {
          const allHeadings = container.querySelectorAll(
            'h1, h2, h3, h4, h5, h6'
          );
          allHeadings.forEach((heading) => {
            if (
              (heading.id && heading.id.includes(targetId)) ||
              targetId.includes(heading.id)
            ) {
              targetElement = heading;
            }
          });
        }

        if (targetElement) {
          // Update URL hash
          const newHash = `#${targetElement.id}`;
          history.pushState(null, null, newHash);

          // Scroll to target with smooth behavior
          setTimeout(() => {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });

            // Small adjustment for fixed header
            setTimeout(() => {
              window.scrollBy(0, -80);
            }, 100);

            // Highlight briefly
            const originalBg = targetElement.style.backgroundColor;
            targetElement.style.transition = 'background-color 0.3s ease';
            targetElement.style.backgroundColor = 'rgba(37, 99, 235, 0.2)';
            setTimeout(() => {
              targetElement.style.backgroundColor = originalBg;
            }, 1000);
          }, 50);
        } else {
          console.warn('Target not found for anchor:', href);
        }
      }
    });
  });
}

// Handle hash navigation when page loads or hash changes
function handleHashNavigation() {
  const hash = window.location.hash;
  if (!hash) return;

  const targetId = hash.substring(1); // Remove the #

  // Try multiple ID formats to find the target
  let targetElement = document.getElementById(targetId);

  // If not found, try with URL decoding
  if (!targetElement) {
    const decodedId = decodeURIComponent(targetId);
    targetElement = document.getElementById(decodedId);
  }

  // If still not found, try finding by text content (fallback)
  if (!targetElement) {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => {
      const headingText = heading.textContent.trim().toLowerCase();
      const idText = targetId.replace(/-/g, ' ').toLowerCase();
      if (headingText.includes(idText) || idText.includes(headingText)) {
        targetElement = heading;
        // Update the URL hash to match the actual ID
        if (heading.id) {
          window.history.replaceState(null, null, `#${heading.id}`);
        }
      }
    });
  }

  if (targetElement) {
    // Small delay to ensure content is rendered
    setTimeout(() => {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Highlight the target briefly
      targetElement.style.transition = 'background-color 0.3s ease';
      const originalBg = targetElement.style.backgroundColor;
      targetElement.style.backgroundColor = 'rgba(37, 99, 235, 0.2)';
      setTimeout(() => {
        targetElement.style.backgroundColor = originalBg;
      }, 1000);
    }, 150);
  } else {
    console.warn('Target element not found for hash:', hash);
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
