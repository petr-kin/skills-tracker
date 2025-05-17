// QA Skills Tracker with GitHub Integration
const { useState, useEffect } = React;

// Initial skills data
const initialSkills = {
  frameworks: [
    { name: 'Playwright', level: 0, priority: 'high', resources: [
      { title: 'Playwright Official Docs', url: 'https://playwright.dev/docs/intro' }
    ]},
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

// Main App Component
function App() {
  // State for skills and UI
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('qaSkills');
    return savedSkills ? JSON.parse(savedSkills) : initialSkills;
  });
  
  const [activeCategory, setActiveCategory] = useState('frameworks');
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  
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

  // Save skills to localStorage
  useEffect(() => {
    localStorage.setItem('qaSkills', JSON.stringify(skills));
  }, [skills]);
  
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

  // Reset all progress
  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setSkills(initialSkills);
      localStorage.removeItem('qaSkills');
    }
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
        
        alert('Data loaded from GitHub successfully!');
      } catch (e) {
        alert('No existing data found on GitHub. Save your current progress first.');
      }
      
      setIsLoading(false);
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
        <div style={{ marginBottom: '1rem' }}>
          {Object.keys(skills).map(category => (
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
          {skills[activeCategory].map((skill, index) => (
            <div key={index} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h3 style={{ margin: 0 }}>{skill.name}</h3>
                <span style={{ 
                  padding: '0.2rem 0.5rem', 
                  borderRadius: '1rem', 
                  fontSize: '0.8rem',
                  backgroundColor: skill.priority === 'high' ? '#fee2e2' : 
                                  skill.priority === 'medium' ? '#fef3c7' : '#d1fae5',
                  color: skill.priority === 'high' ? '#b91c1c' : 
                         skill.priority === 'medium' ? '#92400e' : '#065f46'
                }}>
                  {skill.priority} priority
                </span>
              </div>
              
              <div>
                <p>Proficiency: <strong>{getLevelLabel(skill.level)}</strong></p>
                <div>
                  {[0, 1, 2, 3].map(level => (
                    <button
                      key={level}
                      onClick={() => handleLevelChange(activeCategory, index, level)}
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
          ))}
        </div>
        
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
      
      {/* GitHub Authentication Modal */}
      <GitHubModal />
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
