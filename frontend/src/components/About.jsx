import { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/profile')
      .then(res => setProfile(res.data.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  if (!profile) return null;

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>{profile.summary}</p>
            <div className="about-details">
              <div className="detail-item">
                <strong>📧 Email:</strong> <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
              <div className="detail-item">
                <strong>📱 Phone:</strong> {profile.phone.join(' | ')}
              </div>
              <div className="detail-item">
                <strong>📍 Location:</strong> {profile.location}
              </div>
              <div className="detail-item">
                <strong>🗣️ Languages:</strong> {profile.languages.join(', ')}
              </div>
            </div>
            <div className="education">
              <h3>🎓 Education</h3>
              {profile.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <strong>{edu.degree}</strong>
                  <p>{edu.institution}, {edu.location} — {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
