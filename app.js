// Main app component
const { useState, useEffect } = React;
const { Check, ArrowUpRight, HelpCircle, Award, CheckCircle, Clock, BookOpen } = lucideReact;

// Initial skills data
const initialSkills = {
  frameworks: [
    { name: 'Playwright', level: 0, priority: 'high', resources: [
      { title: 'Playwright Official Docs', url: 'https://playwright.dev/docs/intro' },
      { title: 'Test Automation University - Playwright', url: 'https://testautomationu.applitools.com/playwright-tutorial/' }
    ]},
    // Other frameworks...
    { name: 'Selenium', level: 0, priority: 'high', resources: [] },
    { name: 'Cypress', level: 0, priority: 'medium', resources: [] },
  ],
  languages: [
    { name: 'JavaScript', level: 0, priority: 'high', resources: [] },
    { name: 'TypeScript', level: 0, priority: 'high', resources: [] },
    { name: 'Python', level: 0, priority: 'medium', resources: [] },
  ],
  testingSkills: [
    { name: 'API Testing', level: 0, priority: 'high', resources: [] },
    { name: 'Performance Testing', level: 0, priority: 'medium', resources: [] },
  ],
  methodologies: [
    { name: 'Agile/Scrum', level: 0, priority: 'high', resources: [] },
    { name: 'BDD', level: 0, priority: 'medium', resources: [] },
  ]
};

// GitHub integration component
const GitHubIntegration = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [octokit, setOctokit] = useState(null);
  const [repo, setRepo] = useState({ owner: '', repo: '' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [token, setToken] = useState('');
  const [owner, setOwner] = useState('');
  const [repoName, setRepoName] = useState('');
  const [skills, setSkills] = useState(
    JSON.parse(localStorage.getItem('qaSkills')) || initialSkills
  );
  const [milestones, setMilestones] = useState(
    JSON.parse(localStorage.getItem('milestones')) || []
  );
  const [activeCategory, setActiveCategory] = useState('frameworks');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save skills to localStorage
  useEffect(() => {
    localStorage.setItem('qaSkills', JSON.stringify(skills));
  }, [skills]);

  // Save milestones to localStorage
  useEffect(() => {
    localStorage.setItem('milestones', JSON.stringify(milestones));
  }, [milestones]);

  // Try to restore GitHub auth
  useEffect(() => {
    const savedToken = localStorage.getItem('github_token');
    const savedOwner = localStorage.getItem('github_owner');
    const savedRepo = localStorage.getItem('github_repo');
    
    if (savedToken && savedOwner && savedRepo) {
      authenticate(savedToken, savedOwner, savedRepo);
    }
  }, []);

  // Authenticate with GitHub
  const authenticate = async (tokenVal, ownerVal, repoVal) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create Octokit instance
      const oktokitInstance = new Octokit.Octokit({ auth: tokenVal });
      
      // Test authentication
      await oktokitInstance.rest.users.getAuthenticated();
      
      setOctokit(oktokitInstance);
      setRepo({ owner: ownerVal, repo: repoVal });
      setIsAuthenticated(true);
      
      // Save to localStorage
      localStorage.setItem('github_token', tokenVal);
      localStorage.setItem('github_owner', ownerVal);
      localStorage.setItem('github_repo', repoVal);
      
      // Try to load existing data
      loadFromGitHub(oktokitInstance, ownerVal, repoVal);
      
      setIsLoading(false);
      return true;
    } catch (err) {
      setError('Authentication failed: ' + err.message);
      setIsLoading(false);
      return false;
    }
  };

  // Load data from GitHub
  const loadFromGitHub = async (oktokitInstance, ownerVal, repoVal) => {
    const client = oktokitInstance || octokit;
    const ownerName = ownerVal || repo.owner;
    const repoName = repoVal || repo.repo;
    
    if (!client) return;
    
    try {
      setIsLoading(true);
      
      // Try to load skills data
      try {
        const { data } = await client.rest.repos.getContent({
          owner: ownerName,
          repo: repoName,
          path: 'qa-skills-data.json'
        });
        
        const content = atob(data.content);
        const parsedData = JSON.parse(content);
        setSkills(parsedData);
        localStorage.setItem('qaSkills', JSON.stringify(parsedData));
      } catch (e) {
        console.log('No existing skills data found');
      }
      
      // Try to load milestones data
      try {
        const { data } = await client.rest.repos.getContent({
          owner: ownerName,
          repo: repoName,
          path: 'qa-milestones-data.json'
        });
        
        const content = atob(data.content);
        const parsedData = JSON.parse(content);
        setMilestones(parsedData);
        localStorage.setItem('milestones', JSON.stringify(parsedData));
      } catch (e) {
        console.log('No existing milestones data found');
      }
      
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load data: ' + err.message);
      setIsLoading(false);
    }
  };

  // Save data to GitHub
  const saveToGitHub = async () => {
    if (!isAuthenticated || !octokit) {
      setError('Not authenticated with GitHub');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Save skills data
      await saveFile('qa-skills-data.json', JSON.stringify(skills, null, 2));
      
      // Save milestones data
      await saveFile('qa-milestones-data.json', JSON.stringify(milestones, null, 2));
      
      setIsLoading(false);
      alert('Data saved to GitHub successfully!');
    } catch (err) {
      setError('Failed to save: ' + err.message);
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
      // File doesn't exist yet
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

  // Logout from GitHub
  const logout = () => {
    setIsAuthenticated(false);
    setOctokit(null);
    localStorage.removeItem('github_token');
    localStorage.removeItem('github_owner');
    localStorage.removeItem('github_repo');
  };

  // Handle skill level change
  const handleLevelChange = (category, index, newLevel) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index].level = newLevel;
    setSkills(updatedSkills);
  };

  // Auth modal component
  const AuthModal = () => {
    if (!showAuthModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4">Connect to GitHub</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Personal Access Token</label>
              <input
                type="password"
                className="w-full p-2 border rounded"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Create a token with 'repo' scope at GitHub Settings
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Username</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Repository Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => setShowAuthModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={async () => {
                  const success = await authenticate(token, owner, repoName);
                  if (success) {
                    setShowAuthModal(false);
                  }
                }}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // GitHub controls component
  const GitHubControls = () => (
    <div className="mb-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">GitHub Sync</h3>
      
      {isAuthenticated ? (
        <div>
          <div className="flex items-center text-green-600 mb-2">
            <CheckCircle size={16} className="mr-2" />
            <span>Connected to GitHub ({repo.owner}/{repo.repo})</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => loadFromGitHub()}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Load Data'}
            </button>
            
            <button
              onClick={() => saveToGitHub()}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Now'}
            </button>
            
            <button
              onClick={logout}
              className="px-3 py-1 border text-sm rounded hover:bg-gray-100"
            >
              Disconnect
            </button>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Connect to GitHub to save your progress and access it from any device.
          </p>
          
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Connect to GitHub
          </button>
        </div>
      )}
    </div>
  );

  // Main render
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">QA Skills Development Tracker</h1>
          <p className="text-blue-100">Track your journey to becoming a QA automation expert</p>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto flex-grow p-4 md:p-6">
        {/* GitHub controls */}
        <GitHubControls />
        
        {/* Skills tracker */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Skills Tracker</h2>
          </div>
          
          {/* Category tabs */}
          <div className="flex flex-wrap mb-4 border-b">
            {Object.keys(skills).map(category => (
              <button
                key={category}
                className={`px-4 py-2 mr-2 rounded-t-lg ${
                  activeCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Skills list */}
          <div className="space-y-4">
            {skills[activeCategory].map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <div className="flex items-center mb-2 md:mb-0">
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full 
                      ${skill.priority === 'high' ? 'text-red-500' : 
                        skill.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'} 
                      bg-opacity-20`}
                    >
                      {skill.priority} priority
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3].map(level => (
                      <button
                        key={level}
                        className={`w-8 h-8 rounded-full ${
                          skill.level >= level 
                            ? level === 0 ? 'bg-gray-200'
                            : level === 1 ? 'bg-blue-200'
                            : level === 2 ? 'bg-blue-400'
                            : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                        onClick={() => handleLevelChange(activeCategory, index, level)}
                        title={
                          level === 0 ? 'Not Started' :
                          level === 1 ? 'Beginner' :
                          level === 2 ? 'Intermediate' :
                          'Advanced'
                        }
                      >
                        {skill.level >= level && level > 0 && <Check className="mx-auto text-white" size={16} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Proficiency: <span className="font-medium">
                    {skill.level === 0 ? 'Not Started' :
                     skill.level === 1 ? 'Beginner' :
                     skill.level === 2 ? 'Intermediate' :
                     'Advanced'}
                  </span>
                </div>
                
                {/* Resources */}
                <div className="mt-2">
                  <h4 className="text-sm font-semibold mb-1">Learning Resources:</h4>
                  <ul className="text-sm space-y-1">
                    {skill.resources.map((resource, resIndex) => (
                      <li key={resIndex} className="flex items-center">
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          {resource.title}
                          <ArrowUpRight size={12} className="ml-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Authentication Modal */}
      <AuthModal />
    </div>
  );
};

// Render the app
ReactDOM.render(<GitHubIntegration />, document.getElementById('root'));
