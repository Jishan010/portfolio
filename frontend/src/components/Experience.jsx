import { useState, useEffect } from 'react';
import axios from 'axios';
import './Experience.css';

function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/experiences')
      .then(res => setExperiences(res.data.data))
      .catch(err => console.error('Error fetching experiences:', err));
  }, []);

  return (
    <section id="experience" className="experience">
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3>{exp.role}</h3>
                    <h4>{exp.company} • {exp.location}</h4>
                  </div>
                  <div className="timeline-badge">
                    {exp.period}
                    {exp.current && <span className="current-badge">Current</span>}
                  </div>
                </div>
                {exp.description && (
                  <p className="exp-description">{exp.description}</p>
                )}
                {exp.keyAreas && (
                  <ul className="key-areas">
                    {exp.keyAreas.map((area, idx) => (
                      <li key={idx}>{area}</li>
                    ))}
                  </ul>
                )}
                {exp.highlights && (
                  <div className="highlights">
                    <strong>🌟 Key Highlights:</strong>
                    <ul>
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
