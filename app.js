// QA Skills Tracker with localStorage persistence
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
  // Load from localStorage or use initial data
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('qaSkills');
    return savedSkills ? JSON.parse(savedSkills) : initialSkills;
  });
  
  const [activeCategory, setActiveCategory] = useState('frameworks');

  // Save to localStorage whenever skills change
  useEffect(() => {
    localStorage.setItem('qaSkills', JSON.stringify(skills));
  }, [skills]);

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

  const progress = calculateProgress();

  return (
    <div>
      <header>
        <div className="container">
          <h1>QA Skills Development Tracker</h1>
          <p>Track your journey to becoming a QA automation expert</p>
        </div>
      </header>

      <div className="container">
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
                                  skill.prio
