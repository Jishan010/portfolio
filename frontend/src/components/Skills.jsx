import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import './Skills.css';

function Skills() {
  const [skills, setSkills] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/skills`)
      .then(res => setSkills(res.data.data))
      .catch(err => console.error('Error fetching skills:', err));
  }, []);

  if (!skills) return null;

  const skillCategories = [
    { title: '📱 Mobile Development', key: 'mobile' },
    { title: '🏗️ Architecture & Patterns', key: 'architecture' },
    { title: '⚙️ Android Frameworks', key: 'android' },
    { title: '⚡ Async & Multithreading', key: 'async' },
    { title: '🧪 Testing', key: 'testing' },
    { title: '🌐 Networking', key: 'networking' },
    { title: '💉 Dependency Injection', key: 'di' },
    { title: '🛠️ Tools & Version Control', key: 'tools' },
    { title: '📊 Analytics', key: 'analytics' },
    { title: '☁️ Cloud & AWS', key: 'cloud' },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            skills[category.key] && skills[category.key].length > 0 && (
              <div key={index} className="skill-category">
                <h3>{category.title}</h3>
                <div className="skill-tags">
                  {skills[category.key].map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="competencies">
          <h3>🎯 Core Competencies</h3>
          <div className="competencies-list">
            {skills.competencies.map((comp, index) => (
              <div key={index} className="competency-item">
                <span className="check-icon">✓</span> {comp}
              </div>
            ))}
          </div>
        </div>

        <div className="soft-skills">
          <h3>💼 Soft Skills</h3>
          <div className="skill-tags">
            {skills.soft.map((skill, index) => (
              <span key={index} className="skill-tag soft">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
