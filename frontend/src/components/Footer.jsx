import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Jishan Ansari</h3>
            <p>Senior Software Developer specializing in Android Development and AWS Cloud Solutions.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-social">
              <a href="https://github.com/jishan-ansari" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/jishan-ansari-213261a2" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="mailto:jishan010@gmail.com">
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Jishan Ansari. All rights reserved.</p>
          <p className="footer-tech">Built with React + Node.js | Deployed on AWS</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
