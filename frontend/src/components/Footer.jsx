import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Tamplate Portofolio GRATIS</h3>
            <p>DUM [Membangun masa depan digital]</p>
          </div>

          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-social">
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Made with <FaHeart className="heart" /> by YooowwMann Developer © 2026
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
