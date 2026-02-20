import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import './Hero.css'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>

      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Halo, saya
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            DUM [Nama Kamu]
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            DUM [Membangun pengalaman digital yang menakjubkan dengan kode yang elegan]
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px var(--accent-glow)" }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Karya Saya
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hubungi Saya
            </motion.a>
          </motion.div>

          <motion.div
            className="social-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[FaGithub, FaLinkedin, FaTwitter].map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.2, color: 'var(--accent)' }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="mouse"></div>
      </motion.div>
    </section>
  )
}

export default Hero
