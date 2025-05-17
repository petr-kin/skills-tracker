// Simplified QA Skills Tracker
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
const App = () => {
  // State
  const [skills, setSkills] = useState(
    JSON.parse(localStorage.getItem('qaSkills')) || initialSkills
  );
  const [activeCategory, setActiveCategory] = useState('frameworks');

  // Save to localStorage when skills change
  useEffect(() => {
    localStorage.setItem('qaSkills', JSON.stringify(skills));
  }, [skills]);

  // Handle skill level change
  const handleLevelChange = (category, index, newLevel) => {
    const updatedSkills = { ...skills };
    updatedSkills[category][index].level = newLevel;
    setSkills(updatedSkills);
  };

  // Skill level labels
  const getLevelLabel = (level) => {
    switch (level) {
      case 0: return 'Not Started';
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return '';
    }
  };

  // Priority colors
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return '';
    }
  };

  // Level colors
  const getLevelColor = (level) => {
    switch (level) {
      case 0: return 'bg-gray-200';
      case 1: return 'bg-blue-200';
      case 2: return 'bg-blue-400';
      case 3: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

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
        {/* Stats Summary */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-bold mb-2">Progress Summary</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.keys(skills).map(category => (
              <div key={category} className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="text-sm text-gray-600">
                  {skills[category].filter(s => s.level >= 2).length} advanced skills
                </div>
              </div>
            ))}
          </div>
        </div>
        
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
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${getPriorityColor(skill.priority)} bg-opacity-20`}>
                      {skill.priority} priority
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3].map(level => (
                      <button
                        key={level}
                        className={`w-8 h-8 rounded-full ${
                          skill.level >= level ? getLevelColor(level) : 'bg-gray-200'
                        }`}
                        onClick={() => handleLevelChange(activeCategory, index, level)}
                        title={getLevelLabel(level)}
                      >
                        {skill.level >= level && level > 0 && (
                          <span className="text-white">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Proficiency: <span className="font-medium">{getLevelLabel(skill.level)}</span>
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
                          <span className="ml-1">↗</span>
                        </a>
                      </li>
                    ))}
                    {skill.resources.length === 0 && (
                      <li className="text-gray-500">No resources added yet</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          Data is saved in your browser's local storage.
        </div>
      </footer>
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));
