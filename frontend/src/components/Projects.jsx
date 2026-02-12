import { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data.data))
      .catch(err => console.error('Error fetching projects:', err));
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className="project-client">{project.client}</span>
              </div>
              <p className="project-description">{project.description}</p>
              
              <div className="project-meta">
                <span className="meta-item">👤 {project.role}</span>
                <span className="meta-item">👥 Team: {project.teamSize}</span>
              </div>

              <div className="project-tech">
                <strong>Technologies:</strong>
                <div className="tech-tags">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {project.responsibilities && (
                <div className="project-responsibilities">
                  <strong>Key Responsibilities:</strong>
                  <ul>
                    {project.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
