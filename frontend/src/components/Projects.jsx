import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import axios from 'axios'
import './Projects.css'

const Projects = () => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 }
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

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(() => {
        // Fallback data jika backend belum jalan
        setProjects([
          {
            id: 1,
            title: 'DUM [E-Commerce Platform]',
            description: 'Platform e-commerce modern dengan fitur lengkap',
            image: '🛒',
            category: 'fullstack',
            tech: ['React', 'Node.js', 'MongoDB'],
            github: '#',
            demo: '#'
          },
          {
            id: 2,
            title: 'DUM [Task Management App]',
            description: 'Aplikasi manajemen tugas dengan real-time updates',
            image: '📋',
            category: 'frontend',
            tech: ['React', 'Firebase', 'Tailwind'],
            github: '#',
            demo: '#'
          },
          {
            id: 3,
            title: 'DUM [Weather Dashboard]',
            description: 'Dashboard cuaca interaktif dengan visualisasi data',
            image: '🌤️',
            category: 'frontend',
            tech: ['Vue.js', 'Chart.js', 'API'],
            github: '#',
            demo: '#'
          }
        ])
      })
  }, [])

  const categories = ['all', 'frontend', 'backend', 'fullstack']
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
        >
          Proyek Saya
        </motion.h2>

        <div className="project-filters">
          {categories.map(cat => (
            <motion.button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <span className="project-emoji">{project.image}</span>
              </div>

              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project-tech">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
