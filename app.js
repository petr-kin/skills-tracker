// Simple React QA Skills Tracker
const { useState } = React;

// Initial skills data
const initialSkills = {
  frameworks: [
    { name: 'Playwright', level: 0 },
    { name: 'Selenium', level: 0 },
    { name: 'Cypress', level: 0 },
  ],
  languages: [
    { name: 'JavaScript', level: 0 },
    { name: 'TypeScript', level: 0 },
    { name: 'Python', level: 0 },
  ]
};

// Main App Component
function App() {
  const [skills, setSkills] = useState(initialSkills);
  const [activeCategory, setActiveCategory] = useState('frameworks');

  // Handle skill level change
  const handleLevelChange = (category, index, newLevel) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index].level = newLevel;
    setSkills(updatedSkills);
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

  return (
    <div>
      <header>
        <div className="container">
          <h1>QA Skills Development Tracker</h1>
          <p>Track your journey to becoming a QA automation expert</p>
        </div>
      </header>

      <div className="container">
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
              <h3>{skill.name}</h3>
              <div>
                <p>Proficiency: {getLevelLabel(skill.level)}</p>
                <div>
                  {[0, 1, 2, 3].map(level => (
                    <button
                      key={level}
                      onClick={() => handleLevelChange(activeCategory, index, level)}
                      title={getLevelLabel(level)}
                      className={`skill-level ${skill.level >= level && level > 0 ? `level-${level}` : ''}`}
                    >
                      {skill.level >= level && level > 0 ? '✓' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
