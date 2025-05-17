// Enhanced QA Skills Tracker with GitHub Integration, Courses & Projects
const { useState, useEffect } = React;

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

// Main App Component
function App() {
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
    if (confirm('Are you sure you want to delete this course?')) {
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
      technologies: newProject.technologies
        .split(',')
        .map(tech => tech.trim())
        .filter(tech => tech !== '')
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
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  // Reset all progress
  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
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

  // GitHub Authentication
  const authenticateWithGitHub = async (tokenVal, ownerVal, repoVal) => {
    try {
      setIsLoading(true);
      setGithubError(null);
      
      // Create Octokit instance
      const oktokitInstance = new Octokit({ auth: tokenVal });
      
      // Test authentication
      await oktokitInstance.rest.users.getAuthenticated();
      
      setOctokit(oktokitInstance);
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
        const { data } = await octokit.rest.repos.getContent({
          owner: repo.owner,
          repo: repo.repo,
          path: 'qa-skills-data.json'
        });
        
        const content = atob(data.content);
        const parsedData = JSON.parse(content);
        setSkills(parsedData);
        localStorage.setItem('qaSkills', JSON.stringify(parsedData));
        loadedAny = true;
      } catch (e) {
        console.log('No existing skills data found on GitHub');
      }
      
      // Try to load courses data
      try {
        const { data } = await octokit.rest.repos.getContent({
          owner: repo.owner,
          repo: repo.repo,
          path: 'qa-courses-data.json'
        });
        
        const content = atob(data.content);
        const parsedData = JSON.parse(content);
        setCourses(parsedData);
        localStorage.setItem('qaCourses', JSON.stringify(parsedData));
        loadedAny = true;
      } catch (e) {
        console.log('No existing courses data found on GitHub');
      }
      
      // Try to load projects data
      try {
        const { data } = await octokit.rest.repos.getContent({
          owner: repo.owner,
          repo: repo.repo,
          path: 'qa-projects-data.json'
        });
        
        const content = atob(data.content);
        const parsedData = JSON.parse(content);
        setProjects(parsedData);
        localStorage.setItem('qaProjects', JSON.stringify(parsedData));
        loadedAny = true;
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

  // Helper to save a file to GitHub
  const saveFile = async (path, content) => {
    // Check if file exists
    let sha;
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: repo.owner,
        repo: repo.repo,
        path
      });
      sha = data.sha;
    } catch (e) {
      // File doesn't exist yet, which is fine
    }
    
    // Create or update file
    await octokit.rest.repos.createOrUpdateFileContents({
      owner: repo.owner,
      repo: repo.repo,
      path,
      message: `Update ${path} - ${new Date().toISOString()}`,
      content: btoa(content),
      sha
    });
  };

  // Disconnect from GitHub
  const disconnectGitHub = () => {
    if (confirm('Are you sure you want to disconnect from GitHub? Your local progress will be kept.')) {
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

  // GitHub Modal Component
  const GitHubModal = () => {
    if (!showGitHubModal) return null;
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const success = await authenticateWithGitHub(token, owner, repoName);
      if (success) {
        setShowGitHubModal(false);
      }
    };
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '500px',
          width: '100%'
        }}>
          <h2 style={{ marginTop: 0 }}>Connect to GitHub</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Personal Access Token
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                required
              />
              <small style={{ color: '#666', fontSize: '0.8rem' }}>
                Create a token with 'repo' scope at{' '}
                <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer">
                  GitHub Settings
                </a>
              </small>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                GitHub Username
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Repository Name
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                required
              />
            </div>
            
            {githubError && (
              <div style={{ color: '#ef4444', marginBottom: '1rem' }}>
                {githubError}
              </div>
            )}
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowGitHubModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  cursor: isLoading ? 'wait' : 'pointer'
                }}
              >
                {isLoading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Add Course Modal
  const AddCourseModal = () => {
    if (!showAddCourseModal) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '500px',
          width: '100%'
        }}>
          <h2 style={{ marginTop: 0 }}>Add New Course</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); addCourse(); }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Course Title*
              </label>
              <input
                type="text"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Provider
              </label>
              <input
                type="text"
                value={newCourse.provider}
                onChange={(e) => setNewCourse({...newCourse, provider: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                placeholder="Udemy, Pluralsight, etc."
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                URL
              </label>
              <input
                type="url"
                value={newCourse.url}
                onChange={(e) => setNewCourse({...newCourse, url: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                placeholder="https://..."
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Status
              </label>
              <select
                value={newCourse.status}
                onChange={(e) => setNewCourse({...newCourse, status: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Notes
              </label>
              <textarea
                value={newCourse.notes}
                onChange={(e) => setNewCourse({...newCourse, notes: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem',
                  minHeight: '100px'
                }}
                placeholder="Any notes about this course..."
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowAddCourseModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Add Course
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Add Project Modal
  const AddProjectModal = () => {
    if (!showAddProjectModal) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          maxWidth: '500px',
          width: '100%'
        }}>
          <h2 style={{ marginTop: 0 }}>Add New Project</h2>
          
          <form onSubmit={(e) => { e.preventDefault(); addProject(); }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Project Title*
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                required
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Description
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem',
                  minHeight: '80px'
                }}
                placeholder="Brief description of the project..."
              ></textarea>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Technologies Used
              </label>
              <input
                type="text"
                value={typeof newProject.technologies === 'string' ? newProject.technologies : newProject.technologies.join(', ')}
                onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                placeholder="Playwright, TypeScript, etc. (comma separated)"
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Status
              </label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
              >
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                GitHub URL
              </label>
              <input
                type="url"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem'
                }}
                placeholder="https://github.com/..."
              />
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem' }}>
                Notes
              </label>
              <textarea
                value={newProject.notes}
                onChange={(e) => setNewProject({...newProject, notes: e.target.value})}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem',
                  minHeight: '100px'
                }}
                placeholder="Any notes about this project..."
              ></textarea>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setShowAddProjectModal(false)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '0.25rem',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '0.25rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

   // Update the getPriorityColor function to include the "none" priority
  const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'text-red-500';
    case 'medium': return 'text-yellow-500';
    case 'low': return 'text-green-500';
    case 'none': return 'text-gray-400';
    default: return '';
  }
};

  const renderSkillsTab = () => (
    <>
      {/* Search bar */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '0.25rem'
          }}
        />
      </div>
      
      {/* Progress bar */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2>Overall Progress</h2>
        <div style={{ 
          height: '20px', 
          background: '#eee', 
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '0.5rem'
        }}>
          <div style={{ 
            width: `${progress.percent}%`, 
            height: '100%', 
            background: '#3b82f6',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{progress.completed} of {progress.total} skills started</span>
          <span>{progress.percent}% complete</span>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={resetProgress}
            style={{ 
              background: '#ef4444', 
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem'
            }}
          >
            Reset All Progress
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {Object.keys(filteredSkills).map(category => (
          <button
            key={category}
            className={`btn ${activeCategory === category ? 'btn-selected' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      {/* Skills list */}
  <div>
  {filteredSkills[activeCategory] && filteredSkills[activeCategory].length > 0 ? (
    sortByPriority(filteredSkills[activeCategory]).map((skill, index) => (
      <div key={index} className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <h3 style={{ margin: 0 }}>{skill.name}</h3>
          <div>
            <select
              value={skill.priority}
              onChange={(e) => handlePriorityChange(activeCategory, skills[activeCategory].findIndex(s => s.name === skill.name), e.target.value)}
              style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.8rem',
                border: '1px solid #ddd',
                marginRight: '0.5rem',
                backgroundColor: skill.priority === 'high' ? '#fee2e2' : 
                                skill.priority === 'medium' ? '#fef3c7' : 
                                skill.priority === 'low' ? '#d1fae5' : '#f3f4f6',
                color: skill.priority === 'high' ? '#b91c1c' : 
                      skill.priority === 'medium' ? '#92400e' : 
                      skill.priority === 'low' ? '#065f46' : '#6b7280'
              }}
            >
              <option value="high">High priority</option>
              <option value="medium">Medium priority</option>
              <option value="low">Low priority</option>
              <option value="none">No priority</option>
            </select>
          </div>
        </div>
      
      <div>
        <p>Proficiency: <strong>{getLevelLabel(skill.level)}</strong></p>
        <div>
          {[0, 1, 2, 3].map(level => (
            <button
              key={level}
              onClick={() => handleLevelChange(activeCategory, skills[activeCategory].findIndex(s => s.name === skill.name), level)}
              title={getLevelLabel(level)}
              className={`skill-level ${skill.level >= level && level > 0 ? `level-${level}` : ''}`}
              style={{ cursor: 'pointer' }}
            >
              {skill.level >= level && level > 0 ? '✓' : ''}
            </button>
          ))}
        </div>
      </div>
      
      {/* Resources section */}
      {skill.resources && skill.resources.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ fontSize: '0.9rem', margin: '0 0 0.25rem 0' }}>Learning Resources:</h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {skill.resources.map((resource, idx) => (
              <li key={idx}>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#3b82f6' }}
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
    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
      {searchTerm ? 'No skills match your search.' : 'No skills in this category.'}
    </div>
  )}
</div>
    </>
  );
  
  const renderCoursesTab = () => (
    <>
      {/* Search and add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '70%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '0.25rem'
          }}
        />
        <button
          onClick={() => setShowAddCourseModal(true)}
          className="btn"
          style={{ backgroundColor: '#10b981' }}
        >
          Add Course
        </button>
      </div>
      
      {/* Courses stats */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2>Courses Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {courses.filter(c => c.status === 'completed').length}
            </div>
            <div>Completed</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {courses.filter(c => c.status === 'in-progress').length}
            </div>
            <div>In Progress</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b7280' }}>
              {courses.filter(c => c.status === 'planned').length}
            </div>
            <div>Planned</div>
          </div>
        </div>
      </div>
      
      {/* Courses list */}
      <div>
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <div key={course.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>{course.title}</h3>
                  {course.provider && (
                    <div style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '0.5rem' }}>
                      Provider: {course.provider}
                    </div>
                  )}
                </div>
                <span style={{ 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.8rem',
                  backgroundColor: course.status === 'completed' ? '#d1fae5' : 
                                  course.status === 'in-progress' ? '#fef3c7' : '#f3f4f6',
                  color: course.status === 'completed' ? '#065f46' : 
                         course.status === 'in-progress' ? '#92400e' : '#1f2937'
                }}>
                  {course.status === 'completed' ? 'Completed' : 
                   course.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </span>
              </div>
              
              {course.url && (
                <div style={{ margin: '0.5rem 0' }}>
                  <a 
                    href={course.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#3b82f6', display: 'inline-flex', alignItems: 'center' }}
                  >
                    Course Link
                    <span style={{ marginLeft: '0.25rem' }}>↗</span>
                  </a>
                </div>
              )}
              
              {course.notes && (
                <div style={{ 
                  margin: '0.5rem 0', 
                  padding: '0.5rem',
                  backgroundColor: '#f9fafb',
                  borderLeft: '4px solid #e5e7eb',
                  fontSize: '0.9rem'
                }}>
                  <strong>Notes:</strong> {course.notes}
                </div>
              )}
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '1rem',
                fontSize: '0.8rem',
                color: '#6b7280'
              }}>
                <div>
                  Added: {new Date(course.dateAdded).toLocaleDateString()}
                  {course.dateCompleted && (
                    <span style={{ marginLeft: '1rem' }}>
                      Completed: {new Date(course.dateCompleted).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {course.status !== 'completed' && (
                    <button
                      onClick={() => updateCourseStatus(course.id, 'completed')}
                      style={{ 
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  {course.status === 'planned' && (
                    <button
                      onClick={() => updateCourseStatus(course.id, 'in-progress')}
                      style={{ 
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Start Course
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteCourse(course.id)}
                    style={{ 
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            {searchTerm ? 'No courses match your search.' : 'No courses added yet.'}
          </div>
        )}
      </div>
    </>
  );
  
  const renderProjectsTab = () => (
    <>
      {/* Search and add */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '70%',
            padding: '0.5rem',
            border: '1px solid #ddd',
            borderRadius: '0.25rem'
          }}
        />
        <button
          onClick={() => setShowAddProjectModal(true)}
          className="btn"
          style={{ backgroundColor: '#10b981' }}
        >
          Add Project
        </button>
      </div>
      
      {/* Projects stats */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h2>Projects Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginTop: '1rem' }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <div>Completed</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <div>In Progress</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6b7280' }}>
              {projects.filter(p => p.status === 'planned').length}
            </div>
            <div>Planned</div>
          </div>
        </div>
      </div>
      
      {/* Projects list */}
      <div>
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <div key={project.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0' }}>{project.title}</h3>
                </div>
                <span style={{ 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.8rem',
                  backgroundColor: project.status === 'completed' ? '#d1fae5' : 
                                  project.status === 'in-progress' ? '#fef3c7' : '#f3f4f6',
                  color: project.status === 'completed' ? '#065f46' : 
                         project.status === 'in-progress' ? '#92400e' : '#1f2937'
                }}>
                  {project.status === 'completed' ? 'Completed' : 
                   project.status === 'in-progress' ? 'In Progress' : 'Planned'}
                </span>
              </div>
              
              {project.description && (
                <div style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
                  {project.description}
                </div>
              )}
              
              {project.technologies && project.technologies.length > 0 && (
                <div style={{ margin: '0.5rem 0' }}>
                  <div style={{ fontSize: '0.8rem', color: '#4b5563', marginBottom: '0.25rem' }}>
                    Technologies:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.15rem 0.5rem',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '1rem',
                          fontSize: '0.8rem'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {project.githubUrl && (
                <div style={{ margin: '0.5rem 0' }}>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#3b82f6', display: 'inline-flex', alignItems: 'center' }}
                  >
                    GitHub Repository
                    <span style={{ marginLeft: '0.25rem' }}>↗</span>
                  </a>
                </div>
              )}
              
              {project.notes && (
                <div style={{ 
                  margin: '0.5rem 0', 
                  padding: '0.5rem',
                  backgroundColor: '#f9fafb',
                  borderLeft: '4px solid #e5e7eb',
                  fontSize: '0.9rem'
                }}>
                  <strong>Notes:</strong> {project.notes}
                </div>
              )}
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: '1rem',
                fontSize: '0.8rem',
                color: '#6b7280'
              }}>
                <div>
                  Added: {new Date(project.dateAdded).toLocaleDateString()}
                  {project.dateCompleted && (
                    <span style={{ marginLeft: '1rem' }}>
                      Completed: {new Date(project.dateCompleted).toLocaleDateString()}
                    </span>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {project.status !== 'completed' && (
                    <button
                      onClick={() => updateProjectStatus(project.id, 'completed')}
                      style={{ 
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  {project.status === 'planned' && (
                    <button
                      onClick={() => updateProjectStatus(project.id, 'in-progress')}
                      style={{ 
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      Start Project
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteProject(project.id)}
                    style={{ 
                      padding: '0.25rem 0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.25rem',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            {searchTerm ? 'No projects match your search.' : 'No projects added yet.'}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div>
      <header>
        <div className="container">
          <h1>QA Skills Development Tracker</h1>
          <p>Track your journey to becoming a QA automation expert</p>
        </div>
      </header>

      <div className="container">
        {/* GitHub Integration */}
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2>GitHub Sync</h2>
          
          {isAuthenticated ? (
            <div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '1rem',
                color: '#16a34a'
              }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#16a34a',
                  marginRight: '0.5rem'
                }}></span>
                <span>Connected to GitHub: {repo.owner}/{repo.repo}</span>
              </div>
              
              {lastSaved && (
                <div style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  Last saved: {lastSaved.toLocaleString()}
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={loadFromGitHub}
                  disabled={isLoading}
                  className="btn"
                  style={{ backgroundColor: '#3b82f6' }}
                >
                  {isLoading ? 'Loading...' : 'Load from GitHub'}
                </button>
                
                <button
                  onClick={saveToGitHub}
                  disabled={isLoading}
                  className="btn"
                  style={{ backgroundColor: '#16a34a' }}
                >
                  {isLoading ? 'Saving...' : 'Save to GitHub'}
                </button>
                
                <button
                  onClick={disconnectGitHub}
                  className="btn"
                  style={{ backgroundColor: '#6b7280' }}
                >
                  Disconnect
                </button>
              </div>
              
              {githubError && (
                <div style={{ color: '#ef4444', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  {githubError}
                </div>
              )}
            </div>
          ) : (
            <div>
              <p>Connect to GitHub to save your progress and access it from any device.</p>
              <button
                onClick={() => setShowGitHubModal(true)}
                className="btn"
                style={{ backgroundColor: '#3b82f6', marginTop: '0.5rem' }}
              >
                Connect to GitHub
              </button>
            </div>
          )}
        </div>

        {/* Main tabs */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            <button
              className={`btn ${activeTab === 'skills' ? 'btn-selected' : ''}`}
              onClick={() => { setActiveTab('skills'); setSearchTerm(''); }}
              style={{ 
                borderRadius: '0.25rem 0.25rem 0 0',
                borderBottom: activeTab === 'skills' ? '3px solid #3b82f6' : 'none'
              }}
            >
              Skills
            </button>
            <button
              className={`btn ${activeTab === 'courses' ? 'btn-selected' : ''}`}
              onClick={() => { setActiveTab('courses'); setSearchTerm(''); }}
              style={{ 
                borderRadius: '0.25rem 0.25rem 0 0',
                borderBottom: activeTab === 'courses' ? '3px solid #3b82f6' : 'none'
              }}
            >
              Courses
            </button>
            <button
              className={`btn ${activeTab === 'projects' ? 'btn-selected' : ''}`}
              onClick={() => { setActiveTab('projects'); setSearchTerm(''); }}
              style={{ 
                borderRadius: '0.25rem 0.25rem 0 0',
                borderBottom: activeTab === 'projects' ? '3px solid #3b82f6' : 'none'
              }}
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
        <div style={{ 
          margin: '2rem 0', 
          padding: '1rem', 
          textAlign: 'center',
          borderTop: '1px solid #ddd',
          color: '#666',
          fontSize: '0.9rem'
        }}>
          Your progress is automatically saved in your browser's local storage.
          {isAuthenticated && " You can also save to GitHub for backup and cross-device access."}
        </div>
      </div>
      
      {/* Modals */}
      <GitHubModal />
      <AddCourseModal />
      <AddProjectModal />
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
