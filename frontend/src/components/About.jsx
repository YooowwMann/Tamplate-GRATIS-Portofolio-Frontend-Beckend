import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          Tentang Saya
        </motion.h2>

        <div className="about-content">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="image-wrapper">
              <div className="image-placeholder">
                <span>👨‍💻</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p>
              DUM [Saya adalah seorang developer yang passionate dalam menciptakan
              pengalaman digital yang inovatif dan user-friendly. Dengan
              pengalaman dalam full-stack development, saya fokus pada
              pembuatan aplikasi web modern yang performant dan scalable.]
            </p>
            <p>
              DUM [Saya percaya bahwa kode yang baik adalah kode yang clean,
              maintainable, dan dapat dipahami oleh tim. Selalu belajar
              teknologi baru dan best practices untuk menghasilkan solusi
              terbaik.]
            </p>

            <div className="about-stats">
              <div className="stat">
                <h3>3+</h3>
                <p>Tahun Pengalaman</p>
              </div>
              <div className="stat">
                <h3>50+</h3>
                <p>Proyek Selesai</p>
              </div>
              <div className="stat">
                <h3>30+</h3>
                <p>Klien Puas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
