// Module configuration
// Paths are relative to root directory (where index.html is located)
const modules = [
  {
    id: 'module-01',
    name: 'Introduction to DevOps & DevSecOps',
    path: './Module 01: Introduction to DevOps & DevSecOps/README.md',
    category: 'Foundation',
    order: 1,
  },
  {
    id: 'module-02',
    name: 'Linux & Shell Scripting',
    path: './Module 02: Linux & Shell Scripting/README.md',
    category: 'Foundation',
    order: 2,
    files: [
      {
        name: 'Linux Basics',
        path: './Module 02: Linux & Shell Scripting/README.md',
        icon: '🐧',
      },
      {
        name: 'Shell Scripting',
        path: './Module 02: Linux & Shell Scripting/shell-script.md',
        icon: '💻',
      },
    ],
  },
  {
    id: 'module-03',
    name: 'Git Version Control',
    path: './Module 03: GIT/README.md',
    category: 'Foundation',
    order: 3,
  },
  {
    id: 'module-04',
    name: 'Build Tools',
    path: './Module 04: Build Tools/README.md',
    category: 'Build & Deploy',
    order: 4,
  },
  {
    id: 'module-05',
    name: 'Docker Containerization',
    path: './Module 05: Docker/README.md',
    category: 'Build & Deploy',
    order: 5,
    files: [
      {
        name: 'Docker Basics',
        path: './Module 05: Docker/README.md',
        icon: '🐳',
      },
      {
        name: 'Docker Compose',
        path: './Module 05: Docker/docker-compose.md',
        icon: '📦',
      },
    ],
  },
  {
    id: 'module-06',
    name: 'CI/CD Pipeline Automation',
    path: './Module 06: CI-CD/Readme.md',
    category: 'Automation & Quality',
    order: 6,
    altPaths: ['./Module 06: CI-CD/README.md'], // Fallback path
  },
  {
    id: 'module-07',
    name: 'SonarQube Code Quality',
    path: './Module 07: SonarQube/README.md',
    category: 'Automation & Quality',
    order: 7,
  },
  {
    id: 'module-08',
    name: 'Security Tools & DevSecOps',
    path: './Module 08: Security Tools/README.md',
    category: 'Security & Management',
    order: 8,
  },
  {
    id: 'module-09',
    name: 'Nexus Artifact Management',
    path: './Module 09: Nexus Artifact Management/README.md',
    category: 'Security & Management',
    order: 9,
  },
  {
    id: 'module-10',
    name: 'Kubernetes',
    path: './Module 10: Kubernetes/README.md',
    category: 'Advanced Orchestration',
    order: 10,
  },
  {
    id: 'module-11',
    name: 'Infrastructure as Code (IaC)',
    path: './Module 11: Infrastructure as Code (IaC)/README.md',
    category: 'Advanced Orchestration',
    order: 11,
  },
];

// Group modules by category
const modulesByCategory = modules.reduce((acc, module) => {
  if (!acc[module.category]) {
    acc[module.category] = [];
  }
  acc[module.category].push(module);
  return acc;
}, {});
