import React, { useState, useEffect } from 'react';

// Initial skills data (expanded)
const initialSkills = {
  frameworks: [
  // 🧪 Browser & Web UI Testing
  { name: 'Selenium', level: 0, priority: 'high', resources: [] },
  { name: 'Playwright', level: 0, priority: 'high', resources: [
    { title: 'Playwright Official Docs', url: 'https://playwright.dev/docs/intro' }
  ]},
  { name: 'Cypress', level: 0, priority: 'high', resources: [] },
  { name: 'WebdriverIO', level: 0, priority: 'medium', resources: [] },
  { name: 'TestCafe', level: 0, priority: 'low', resources: [] },

  // 📱 Mobile Testing
  { name: 'Appium', level: 0, priority: 'high', resources: [] },

  // 🔗 API & Integration Testing
  { name: 'Postman', level: 0, priority: 'high', resources: [] },
  { name: 'RestAssured', level: 0, priority: 'medium', resources: [] },
  { name: 'SuperTest', level: 0, priority: 'medium', resources: [] },
  { name: 'Karate DSL', level: 0, priority: 'medium', resources: [] },

  // 💬 BDD & DSL Frameworks
  { name: 'Cucumber', level: 0, priority: 'high', resources: [] },
  { name: 'Robot Framework', level: 0, priority: 'medium', resources: [] },
  { name: 'pytest-bdd', level: 0, priority: 'medium', resources: [] },

  // ⚙️ Unit & Component Testing
  { name: 'JUnit', level: 0, priority: 'medium', resources: [] },
  { name: 'TestNG', level: 0, priority: 'medium', resources: [] },
  { name: 'Jest', level: 0, priority: 'medium', resources: [] },
  { name: 'Mocha', level: 0, priority: 'medium', resources: [] },
  { name: 'Chai', level: 0, priority: 'low', resources: [] },
  { name: 'QUnit', level: 0, priority: 'low', resources: [] },

  // 📊 Reporting & Analysis
  { name: 'Allure Reporting', level: 0, priority: 'medium', resources: [] }
],
 languages: [
  // 🔤 Frontend & Scripting
  { name: 'JavaScript', level: 0, priority: 'high', resources: [] },
  { name: 'TypeScript', level: 0, priority: 'high', resources: [] },
  { name: 'Python', level: 0, priority: 'medium', resources: [] },
  { name: 'Java', level: 0, priority: 'medium', resources: [] },

  // 💼 Backend & Enterprise
  { name: 'C#', level: 0, priority: 'low', resources: [] },
  { name: 'Ruby', level: 0, priority: 'low', resources: [] },
  { name: 'Go', level: 0, priority: 'low', resources: [] },

  // 📄 Infrastructure & Scripting
  { name: 'Groovy', level: 0, priority: 'low', resources: [] },
  { name: 'YAML', level: 0, priority: 'medium', resources: [] },

  // 🧠 Database & Queries
  { name: 'SQL', level: 0, priority: 'medium', resources: [] }
],
  testingSkills: [
  // 🧪 Core QA Skills
  { name: 'API Testing', level: 0, priority: 'high', resources: [] },
  { name: 'E2E Testing', level: 0, priority: 'high', resources: [] },
  { name: 'Component Testing', level: 0, priority: 'high', resources: [] },
  { name: 'Unit Testing', level: 0, priority: 'high', resources: [] },
  { name: 'Test Data Management', level: 0, priority: 'high', resources: [] },
  { name: 'Mock/Stub Services', level: 0, priority: 'high', resources: [] },

  // ⚡️ Advanced Testing Areas
  { name: 'Performance Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Load Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Security Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Contract Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Mobile Testing', level: 0, priority: 'medium', resources: [] },

  // 🎨 UI & Accessibility
  { name: 'Visual Regression Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Accessibility Testing', level: 0, priority: 'medium', resources: [] }
],
  methodologies: [
  // 📈 Development Strategies
  { name: 'Agile/Scrum', level: 0, priority: 'high', resources: [] },
  { name: 'TDD', level: 0, priority: 'high', resources: [] },
  { name: 'BDD', level: 0, priority: 'medium', resources: [] },

  // 🔄 DevOps Practices
  { name: 'CI/CD', level: 0, priority: 'high', resources: [] },
  { name: 'DevOps', level: 0, priority: 'medium', resources: [] },
  { name: 'Shift-Left Testing', level: 0, priority: 'medium', resources: [] },

  // 🧠 Test Design Concepts
  { name: 'Test Automation Pyramid', level: 0, priority: 'high', resources: [] },
  { name: 'Page Object Model', level: 0, priority: 'high', resources: [] },
  { name: 'Data-Driven Testing', level: 0, priority: 'high', resources: [] },
  { name: 'Risk-Based Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Exploratory Testing', level: 0, priority: 'medium', resources: [] }
],
  tools: [
  // 🔧 Manual Testing Tools
  { name: 'Postman', level: 0, priority: 'high', resources: [] },
  { name: 'TestRail', level: 0, priority: 'medium', resources: [] },
  { name: 'JIRA', level: 0, priority: 'high', resources: [] },
  { name: 'Charles Proxy', level: 0, priority: 'medium', resources: [] },
  { name: 'Fiddler', level: 0, priority: 'medium', resources: [] },
  { name: 'Cypress Dashboard', level: 0, priority: 'medium', resources: [] },
  { name: 'Applitools', level: 0, priority: 'medium', resources: [] },
  { name: 'TestSigma', level: 0, priority: 'medium', resources: [] },

  // 🤖 Automation Tools
  { name: 'Selenium Grid', level: 0, priority: 'medium', resources: [] },
  { name: 'BrowserStack', level: 0, priority: 'medium', resources: [] },
  { name: 'Sauce Labs', level: 0, priority: 'medium', resources: [] },
  { name: 'LambdaTest', level: 0, priority: 'medium', resources: [] },
  { name: 'SoapUI', level: 0, priority: 'low', resources: [] },
  { name: 'JMeter', level: 0, priority: 'medium', resources: [] },

  // ⚙️ DevOps & CI/CD Tools
  { name: 'Git', level: 0, priority: 'high', resources: [] },
  { name: 'GitHub Actions', level: 0, priority: 'high', resources: [] },
  { name: 'Jenkins', level: 0, priority: 'high', resources: [] },
  { name: 'CircleCI', level: 0, priority: 'medium', resources: [] },
  { name: 'Azure DevOps', level: 0, priority: 'medium', resources: [] },
  { name: 'Docker', level: 0, priority: 'high', resources: [] },
  { name: 'Kubernetes (CLI basics)', level: 0, priority: 'medium', resources: [] },
  { name: 'Slack (CI alerts)', level: 0, priority: 'low', resources: [] },

  // 📊 Monitoring & Quality Tools
  { name: 'SonarQube', level: 0, priority: 'medium', resources: [] },
  { name: 'Snyk', level: 0, priority: 'medium', resources: [] },
  { name: 'Grafana', level: 0, priority: 'medium', resources: [] },
  { name: 'Prometheus', level: 0, priority: 'medium', resources: [] },

  // 🔐 Security Testing Tools
  { name: 'ZAP (Zed Attack Proxy)', level: 0, priority: 'medium', resources: [] },
  { name: 'Burp Suite', level: 0, priority: 'medium', resources: [] }
],
databases: [
  // 🛠 Core SQL Databases
  { name: 'MySQL', level: 0, priority: 'high', resources: [] },
  { name: 'PostgreSQL', level: 0, priority: 'high', resources: [] },
  { name: 'SQL Server', level: 0, priority: 'medium', resources: [] },
  { name: 'Oracle', level: 0, priority: 'medium', resources: [] },
  { name: 'SQLite', level: 0, priority: 'low', resources: [] },

  // 📦 NoSQL & Caching
  { name: 'MongoDB', level: 0, priority: 'medium', resources: [] },
  { name: 'Redis', level: 0, priority: 'low', resources: [] },

  // 🔍 Testing Skills
  { name: 'Database Testing', level: 0, priority: 'high', resources: [] },
  { name: 'SQL Query Optimization', level: 0, priority: 'high', resources: [] },
  { name: 'SQL Injection Testing', level: 0, priority: 'high', resources: [] },
  { name: 'Data Integrity Testing', level: 0, priority: 'high', resources: [] },
  { name: 'Database Migration Testing', level: 0, priority: 'medium', resources: [] },
  { name: 'Database Design', level: 0, priority: 'medium', resources: [] },
  { name: 'Database Backup & Recovery', level: 0, priority: 'low', resources: [] },
  { name: 'Database Performance Testing', level: 0, priority: 'medium', resources: [] }
]
};

// Initial courses data
const initialCourses = [
  { 
    id: 1, 
    title: 'Playwright for Test Automation', 
    provider: 'Udemy', 
    url: 'https://www.udemy.com/course/playwright-tutorials/',
    status: 'planned',
    dateAdded: new Date().toISOString(),
    dateCompleted: null,
    notes: 'Essential for modern E2E testing'
  }
];

// Initial projects data
const initialProjects = [
  {
    id: 1,
    title: 'E-commerce Site Test Suite',
    description: 'Automated tests for shopping cart and checkout flow',
    technologies: ['Playwright', 'TypeScript', 'GitHub Actions'],
    status: 'in-progress',
    dateAdded: new Date().toISOString(),
    dateCompleted: null,
    githubUrl: '',
    notes: 'Focus on E2E tests and visual regression'
  }
];

// GitHub modal component
const GitHubModal = ({ 
  show, 
  onClose, 
  token, 
  setToken, 
  owner, 
  setOwner, 
  repoName, 
  setRepoName, 
  onSubmit, 
  isLoading,
  githubError 
}) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Connect to GitHub</h2>
        
        <div className="mb-4">
          <div className="block mb-1">Personal Access Token</div>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="text-gray-500 text-xs">
            Create a token with 'repo' scope at{' '}
            <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-blue-500">
              GitHub Settings
            </a>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">GitHub Username</div>
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Repository Name</div>
          <input
            type="text"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <div className="text-gray-500 text-xs">
            A private repository will be created if it doesn't exist
          </div>
        </div>
        
        {githubError && (
          <div className="text-red-500 mb-4">
            {githubError}
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading || !token || !owner || !repoName}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Course modal component
const CourseModal = ({
  show,
  onClose,
  course,
  setCourse,
  onSubmit,
  title = "Add New Course"
}) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        
        <div className="mb-4">
          <div className="block mb-1">Course Title*</div>
          <input
            type="text"
            value={course.title}
            onChange={(e) => setCourse({...course, title: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Provider</div>
          <input
            type="text"
            value={course.provider}
            onChange={(e) => setCourse({...course, provider: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Udemy, Pluralsight, etc."
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">URL</div>
          <input
            type="url"
            value={course.url}
            onChange={(e) => setCourse({...course, url: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://..."
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Status</div>
          <select
            value={course.status}
            onChange={(e) => setCourse({...course, status: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Notes</div>
          <textarea
            value={course.notes}
            onChange={(e) => setCourse({...course, notes: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded min-h-24"
            placeholder="Any notes about this course..."
          ></textarea>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!course.title}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {title.startsWith("Add") ? "Add Course" : "Update Course"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Project modal component
const ProjectModal = ({
  show,
  onClose,
  project,
  setProject,
  onSubmit,
  title = "Add New Project"
}) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        
        <div className="mb-4">
          <div className="block mb-1">Project Title*</div>
          <input
            type="text"
            value={project.title}
            onChange={(e) => setProject({...project, title: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Description</div>
          <textarea
            value={project.description}
            onChange={(e) => setProject({...project, description: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded min-h-20"
            placeholder="Brief description of the project..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Technologies Used</div>
          <input
            type="text"
            value={typeof project.technologies === 'string' ? project.technologies : project.technologies.join(', ')}
            onChange={(e) => setProject({...project, technologies: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Playwright, TypeScript, etc. (comma separated)"
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Status</div>
          <select
            value={project.status}
            onChange={(e) => setProject({...project, status: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="planned">Planned</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">GitHub URL</div>
          <input
            type="url"
            value={project.githubUrl}
            onChange={(e) => setProject({...project, githubUrl: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="https://github.com/..."
          />
        </div>
        
        <div className="mb-4">
          <div className="block mb-1">Notes</div>
          <textarea
            value={project.notes}
            onChange={(e) => setProject({...project, notes: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded min-h-24"
            placeholder="Any notes about this project..."
          ></textarea>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={!project.title}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {title.startsWith("Add") ? "Add Project" : "Update Project"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  // State for skills and UI
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('qaSkills');
    return savedSkills ? JSON.parse(savedSkills) : initialSkills;
  });
  
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('qaCourses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });
  
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('qaProjects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });
  
  const [activeTab, setActiveTab] = useState('skills');
  const [activeCategory, setActiveCategory] = useState('frameworks');
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    provider: '',
    url: '',
    status: 'planned',
    notes: ''
  });
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    status: 'planned',
    githubUrl: '',
    notes: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // GitHub state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [octokit, setOctokit] = useState(null);
  const [repo, setRepo] = useState({ owner: '', repo: '' });
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [githubError, setGithubError] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // Priority management
  const handlePriorityChange = (category, index, newPriority) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index].priority = newPriority;
    setSkills(updatedSkills);
  };

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('qaSkills', JSON.stringify(skills));
  }, [skills]);
  
  useEffect(() => {
    localStorage.setItem('qaCourses', JSON.stringify(courses));
  }, [courses]);
  
  useEffect(() => {
    localStorage.setItem('qaProjects', JSON.stringify(projects));
  }, [projects]);
  
  // Try to restore GitHub auth on load
  useEffect(() => {
    const savedToken = localStorage.getItem('github_token');
    const savedOwner = localStorage.getItem('github_owner');
    const savedRepo = localStorage.getItem('github_repo');
    const savedTime = localStorage.getItem('github_last_saved');
    
    if (savedToken && savedOwner && savedRepo) {
      setToken(savedToken);
      setOwner(savedOwner);
      setRepoName(savedRepo);
      authenticateWithGitHub(savedToken, savedOwner, savedRepo);
      
      if (savedTime) {
        setLastSaved(new Date(parseInt(savedTime)));
      }
    }
  }, []);

  // Handle skill level change
  const handleLevelChange = (category, index, newLevel) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index].level = newLevel;
    setSkills(updatedSkills);
  };

  // Add a new course
  const addCourse = () => {
    if (!newCourse.title) return;
    
    const course = {
      ...newCourse,
      id: Date.now(),
      dateAdded: new Date().toISOString(),
      dateCompleted: newCourse.status === 'completed' ? new Date().toISOString() : null
    };
    
    setCourses([...courses, course]);
    setNewCourse({
      title: '',
      provider: '',
      url: '',
      status: 'planned',
      notes: ''
    });
    setShowAddCourseModal(false);
  };

  // Update course status
  const updateCourseStatus = (id, newStatus) => {
    setCourses(courses.map(course => {
      if (course.id === id) {
        return {
          ...course,
          status: newStatus,
          dateCompleted: newStatus === 'completed' ? new Date().toISOString() : null
        };
      }
      return course;
    }));
  };

  // Delete course
  const deleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Add a new project
  const addProject = () => {
    if (!newProject.title) return;
    
    const project = {
      ...newProject,
      id: Date.now(),
      dateAdded: new Date().toISOString(),
      dateCompleted: newProject.status === 'completed' ? new Date().toISOString() : null,
      technologies: typeof newProject.technologies === 'string' 
        ? newProject.technologies
            .split(',')
            .map(tech => tech.trim())
            .filter(tech => tech !== '')
        : newProject.technologies
    };
    
    setProjects([...projects, project]);
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      status: 'planned',
      githubUrl: '',
      notes: ''
    });
    setShowAddProjectModal(false);
  };

  // Update project status
  const updateProjectStatus = (id, newStatus) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        return {
          ...project,
          status: newStatus,
          dateCompleted: newStatus === 'completed' ? new Date().toISOString() : null
        };
      }
      return project;
    }));
  };

  // Delete project
  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  // Reset all progress
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setSkills(initialSkills);
      localStorage.removeItem('qaSkills');
    }
  };

  // Sort skills by priority
  const sortByPriority = (skills) => {
    const priorityOrder = {
      'high': 1,
      'medium': 2,
      'low': 3,
      'none': 4
    };
    
    return [...skills].sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };
  
  // Get level label
  const getLevelLabel = (level) => {
    switch (level) {
      case 0: return 'Not Started';
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return '';
    }
  };

  // Calculate overall progress
  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    
    Object.keys(skills).forEach(category => {
      skills[category].forEach(skill => {
        total++;
        if (skill.level > 0) completed++;
      });
    });
    
    return {
      percent: Math.round((completed / total) * 100),
      completed,
      total
    };
  };

  // Helper for base64 encoding
  const b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  };
  
  // Helper for base64 decoding
  const b64DecodeUnicode = (str) => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  };

  // GitHub Authentication
  const authenticateWithGitHub = async (tokenVal, ownerVal, repoVal) => {
    try {
      setIsLoading(true);
      setGithubError(null);
      
      // Test the token by fetching the user info
      const userResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${tokenVal}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!userResponse.ok) {
        throw new Error(`GitHub API error: ${userResponse.status}`);
      }
      
      // Check if repo exists
      const repoResponse = await fetch(`https://api.github.com/repos/${ownerVal}/${repoVal}`, {
        headers: {
          'Authorization': `token ${tokenVal}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      // If repo doesn't exist, create it
      if (!repoResponse.ok && repoResponse.status === 404) {
        // Create repo
        const createRepoResponse = await fetch('https://api.github.com/user/repos', {
          method: 'POST',
          headers: {
            'Authorization': `token ${tokenVal}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: repoVal,
            description: 'QA Skills Tracker data repository',
            private: true
          })
        });
        
        if (!createRepoResponse.ok) {
          throw new Error(`Failed to create repository: ${createRepoResponse.status}`);
        }
      } else if (!repoResponse.ok) {
        throw new Error(`Repository check failed: ${repoResponse.status}`);
      }
      
      // Store token for later use
      setOctokit({ token: tokenVal }); 
      setRepo({ owner: ownerVal, repo: repoVal });
      setIsAuthenticated(true);
      
      // Save to localStorage
      localStorage.setItem('github_token', tokenVal);
      localStorage.setItem('github_owner', ownerVal);
      localStorage.setItem('github_repo', repoVal);
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setGithubError(`Authentication failed: ${err.message}`);
      setIsLoading(false);
      return false;
    }
  };

  // Handle GitHub form submission
  const handleGitHubSubmit = async () => {
    const success = await authenticateWithGitHub(token, owner, repoName);
    if (success) {
      setShowGitHubModal(false);
    }
  };

  // Save to GitHub
  const saveToGitHub = async () => {
    if (!isAuthenticated || !octokit) {
      setGithubError('Not authenticated with GitHub');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Save skills data
      await saveFile('qa-skills-data.json', JSON.stringify(skills, null, 2));
      
      // Save courses data
      await saveFile('qa-courses-data.json', JSON.stringify(courses, null, 2));
      
      // Save projects data
      await saveFile('qa-projects-data.json', JSON.stringify(projects, null, 2));
      
      const now = new Date();
      setLastSaved(now);
      localStorage.setItem('github_last_saved', now.getTime().toString());
      
      setIsLoading(false);
      alert('Progress saved to GitHub successfully!');
    } catch (err) {
      setGithubError(`Failed to save: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Load from GitHub
  const loadFromGitHub = async () => {
    if (!isAuthenticated || !octokit) {
      setGithubError('Not authenticated with GitHub');
      return;
    }
    
    try {
      setIsLoading(true);
      let loadedAny = false;
      
      // Try to load skills data
      try {
        const skillsData = await getFileContent('qa-skills-data.json');
        if (skillsData) {
          setSkills(JSON.parse(skillsData));
          localStorage.setItem('qaSkills', skillsData);
          loadedAny = true;
        }
      } catch (e) {
        console.log('No existing skills data found on GitHub');
      }
      
      // Try to load courses data
      try {
        const coursesData = await getFileContent('qa-courses-data.json');
        if (coursesData) {
          setCourses(JSON.parse(coursesData));
          localStorage.setItem('qaCourses', coursesData);
          loadedAny = true;
        }
      } catch (e) {
        console.log('No existing courses data found on GitHub');
      }
      
      // Try to load projects data
      try {
        const projectsData = await getFileContent('qa-projects-data.json');
        if (projectsData) {
          setProjects(JSON.parse(projectsData));
          localStorage.setItem('qaProjects', projectsData);
          loadedAny = true;
        }
      } catch (e) {
        console.log('No existing projects data found on GitHub');
      }
      
      setIsLoading(false);
      
      if (loadedAny) {
        alert('Data loaded from GitHub successfully!');
      } else {
        alert('No existing data found on GitHub. Save your current progress first.');
      }
    } catch (err) {
      setGithubError(`Failed to load: ${err.message}`);
      setIsLoading(false);
    }
  };

  // Helper to get file content from GitHub
  const getFileContent = async (path) => {
    const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${path}`, {
      headers: {
        'Authorization': `token ${octokit.token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to get file: ${response.status}`);
    }
    
    const data = await response.json();
    return b64DecodeUnicode(data.content);
  };

  // Helper to save a file to GitHub
  const saveFile = async (path, content) => {
    // Check if file exists to get SHA
    let sha = null;
    try {
      const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${path}`, {
        headers: {
          'Authorization': `token ${octokit.token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        sha = data.sha;
      }
    } catch (e) {
      // File doesn't exist yet, which is fine
    }
    
    // Create or update file
    const payload = {
      message: `Update ${path} - ${new Date().toISOString()}`,
      content: b64EncodeUnicode(content)
    };
    
    if (sha) {
      payload.sha = sha;
    }
    
    const response = await fetch(`https://api.github.com/repos/${repo.owner}/${repo.repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${octokit.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to save file: ${response.status}`);
    }
  };

  // Disconnect from GitHub
  const disconnectGitHub = () => {
    if (window.confirm('Are you sure you want to disconnect from GitHub? Your local progress will be kept.')) {
      setIsAuthenticated(false);
      setOctokit(null);
      setLastSaved(null);
      localStorage.removeItem('github_token');
      localStorage.removeItem('github_owner');
      localStorage.removeItem('github_repo');
      localStorage.removeItem('github_last_saved');
    }
  };

  // Filter skills by search term
  const filteredSkills = searchTerm.trim() === '' 
    ? skills 
    : Object.keys(skills).reduce((acc, category) => {
        acc[category] = skills[category].filter(skill => 
          skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return acc;
      }, {});

  // Filter courses by search term
  const filteredCourses = searchTerm.trim() === ''
    ? courses
    : courses.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );

  // Filter projects by search term
  const filteredProjects = searchTerm.trim() === ''
    ? projects
    : projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

  const progress = calculateProgress();

  const renderSkillsTab = () => (
    <>
      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      {/* Progress bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Overall Progress</h2>
        <div className="h-5 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress.percent}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm">
          <span>{progress.completed} of {progress.total} skills started</span>
          <span>{progress.percent}% complete</span>
        </div>
        <div className="mt-4">
          <button 
            onClick={resetProgress}
            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
          >
            Reset All Progress
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(filteredSkills).map(category => (
          <button
            key={category}
            className={`px-3 py-1 rounded ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Skills list */}
      <div className="space-y-4">
        {filteredSkills[activeCategory] && filteredSkills[activeCategory].length > 0 ? (
          sortByPriority(filteredSkills[activeCategory]).map((skill, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{skill.name}</h3>
                <div>
                  <select
                    value={skill.priority}
                    onChange={(e) => handlePriorityChange(activeCategory, skills[activeCategory].findIndex(s => s.name === skill.name), e.target.value)}
                    className={`p-1 rounded text-sm border ${
                      skill.priority === 'high' ? 'bg-red-100 text-red-700 border-red-200' : 
                      skill.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 
                      skill.priority === 'low' ? 'bg-green-100 text-green-700 border-green-200' : 
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    <option value="high">High priority</option>
                    <option value="medium">Medium priority</option>
                    <option value="low">Low priority</option>
                    <option value="none">No priority</option>
                  </select>
                </div>
              </div>
            
              <div>
                <p className="mb-2">Proficiency: <strong>{getLevelLabel(skill.level)}</strong></p>
                <div className="flex gap-2">
                  {[0, 1, 2, 3].map(level => (
                    <button
                      key={level}
                      onClick={() => handleLevelChange(activeCategory, skills[activeCategory].findIndex(s => s.name === skill.name), level)}
                      title={getLevelLabel(level)}
                      className={`w-8 h-8 border rounded flex items-center justify-center ${
                        level === 0 ? 'bg-gray-100' :
                        level === 1 && skill.level >= 1 ? 'bg-green-100 border-green-300' : 
                        level === 2 && skill.level >= 2 ? 'bg-blue-100 border-blue-300' : 
                        level === 3 && skill.level >= 3 ? 'bg-purple-100 border-purple-300' :
                        'bg-gray-100'
                      }`}
                    >
                      {skill.level >= level && level > 0 ? '✓' : ''}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Resources section */}
              {skill.resources && skill.resources.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-1">Learning Resources:</h4>
                  <ul className="pl-6 list-disc">
                    {skill.resources.map((resource, idx) => (
                      <li key={idx}>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {resource.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No skills match your search.' : 'No skills in this category.'}
          </div>
        )}
      </div>
    </>
  );
  
  const renderCoursesTab = () => (
    <>
      {/* Search and add */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setShowAddCourseModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Course
        </button>
      </div>
      
      {/* Courses stats */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Courses Summary</h2>
        <div className="flex justify-around text-center mt-4">
          <div>
            <div className="text-4xl font-bold text-blue-500">
              {courses.filter(c => c.status === 'completed').length}
            </div>
            <div>Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500">
              {courses.filter(c => c.status === 'in-progress').length}
            </div>
            <div>In Progress</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-500">
              {courses.filter(c => c.status === 'planned').length}
            </div>
            <div>Planned</div>
          </div>
        </div>
      </div>
      
      {/* Courses list */}
      <div className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                  {course.provider && (
                    <div className="text-sm text-gray-600 mb-2">
                      Provider: {course.provider}
                    </div>
                  )}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  course.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  course.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {course.status === 'completed' ? 'Completed' : 
                   course.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </span>
              </div>
              
              {course.url && (
                <div className="mt-2 mb-2">
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    Course Link
                    <span className="ml-1">↗</span>
                  </a>
                </div>
              )}
              
              {course.notes && (
                <div className="mt-2 mb-2 p-2 bg-gray-50 border-l-4 border-gray-200 text-sm">
                  <strong>Notes:</strong> {course.notes}
                </div>
              )}
              
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <div>
                  Added: {new Date(course.dateAdded).toLocaleDateString()}
                  {course.dateCompleted && (
                    <span className="ml-4">
                      Completed: {new Date(course.dateCompleted).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {course.status !== 'completed' && (
                    <button
                      onClick={() => updateCourseStatus(course.id, 'completed')}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  {course.status === 'planned' && (
                    <button
                      onClick={() => updateCourseStatus(course.id, 'in-progress')}
                      className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                    >
                      Start Course
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No courses match your search.' : 'No courses added yet.'}
          </div>
        )}
      </div>
    </>
  );
  
  const renderProjectsTab = () => (
    <>
      {/* Search and add */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-2/3 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => setShowAddProjectModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Project
        </button>
      </div>
      
      {/* Projects stats */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-2">Projects Summary</h2>
        <div className="flex justify-around text-center mt-4">
          <div>
            <div className="text-4xl font-bold text-blue-500">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div>Completed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div>In Progress</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-500">
              {projects.filter(p => p.status === 'planned').length}
            </div>
            <div>Planned</div>
          </div>
        </div>
      </div>
      
      {/* Projects list */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  project.status === 'completed' ? 'bg-green-100 text-green-800' : 
                  project.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {project.status === 'completed' ? 'Completed' : 
                   project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </span>
              </div>
              
              {project.description && (
                <div className="mt-2 mb-2 text-sm">
                  {project.description}
                </div>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="mt-2 mb-2">
                  <div className="text-xs text-gray-600 mb-1">
                    Technologies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-gray-200 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {project.githubUrl && (
                <div className="mt-2 mb-2">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center"
                  >
                    GitHub Repository
                    <span className="ml-1">↗</span>
                  </a>
                </div>
              )}
              
              {project.notes && (
                <div className="mt-2 mb-2 p-2 bg-gray-50 border-l-4 border-gray-200 text-sm">
                  <strong>Notes:</strong> {project.notes}
                </div>
              )}
              
              <div className="flex justify-between mt-4 text-xs text-gray-500">
                <div>
                  Added: {new Date(project.dateAdded).toLocaleDateString()}
                  {project.dateCompleted && (
                    <span className="ml-4">
                      Completed: {new Date(project.dateCompleted).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  {project.status !== 'completed' && (
                    <button
                      onClick={() => updateProjectStatus(project.id, 'completed')}
                      className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  {project.status === 'planned' && (
                    <button
                      onClick={() => updateProjectStatus(project.id, 'in-progress')}
                      className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                    >
                      Start Project
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'No projects match your search.' : 'No projects added yet.'}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">QA Skills Development Tracker</h1>
          <p className="text-blue-100">Track your journey to becoming a QA automation expert</p>
        </div>
      </header>

      <div className="container mx-auto px-4 pb-8">
        {/* GitHub Integration */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-2">GitHub Sync</h2>
          
          {isAuthenticated ? (
            <div>
              <div className="flex items-center mb-4 text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-2"></span>
                <span>Connected to GitHub: {repo.owner}/{repo.repo}</span>
              </div>
              
              {lastSaved && (
                <div className="mb-2 text-sm">
                  Last saved: {lastSaved.toLocaleString()}
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={loadFromGitHub}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
                >
                  {isLoading ? 'Loading...' : 'Load from GitHub'}
                </button>
                
                <button
                  onClick={saveToGitHub}
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
                >
                  {isLoading ? 'Saving...' : 'Save to GitHub'}
                </button>
                
                <button
                  onClick={disconnectGitHub}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Disconnect
                </button>
              </div>
              
              {githubError && (
                <div className="text-red-500 mt-2 text-sm">
                  {githubError}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p className="mb-2">Connect to GitHub to save your progress and access it from any device.</p>
              <button
                onClick={() => setShowGitHubModal(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Connect to GitHub
              </button>
            </div>
          )}
        </div>

        {/* Main tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'skills' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => { setActiveTab('skills'); setSearchTerm(''); }}
            >
              Skills
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'courses' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => { setActiveTab('courses'); setSearchTerm(''); }}
            >
              Courses
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'projects' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
              onClick={() => { setActiveTab('projects'); setSearchTerm(''); }}
            >
              Projects
            </button>
          </div>
        </div>
        
        {/* Tab content */}
        {activeTab === 'skills' && renderSkillsTab()}
        {activeTab === 'courses' && renderCoursesTab()}
        {activeTab === 'projects' && renderProjectsTab()}
        
        {/* Footer */}
        <div className="mt-8 pt-4 text-center text-gray-500 text-sm border-t border-gray-200">
          Your progress is automatically saved in your browser's local storage.
          {isAuthenticated && " You can also save to GitHub for backup and cross-device access."}
        </div>
      </div>
      
      {/* Modals */}
      <GitHubModal 
        show={showGitHubModal}
        onClose={() => setShowGitHubModal(false)}
        token={token}
        setToken={setToken}
        owner={owner}
        setOwner={setOwner}
        repoName={repoName}
        setRepoName={setRepoName}
        onSubmit={handleGitHubSubmit}
        isLoading={isLoading}
        githubError={githubError}
      />
      
      <CourseModal
        show={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        course={newCourse}
        setCourse={setNewCourse}
        onSubmit={addCourse}
      />
      
      <ProjectModal
        show={showAddProjectModal}
        onClose={() => setShowAddProjectModal(false)}
        project={newProject}
        setProject={setNewProject}
        onSubmit={addProject}
      />
    </div>
  );
};

export default App;
