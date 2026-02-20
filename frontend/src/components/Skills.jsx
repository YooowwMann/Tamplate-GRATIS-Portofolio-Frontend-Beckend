import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Skills.css'

const Skills = () => {
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

  const skillCategories = [
    {
      title: 'DUM [Frontend]',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Vue.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 95 }
      ]
    },
    {
      title: 'DUM [Backend]',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 90 },
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 }
      ]
    },
    {
      title: 'DUM [Tools & Others]',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Figma', level: 85 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
        >
          Skills
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.2 }}
            >
              <h3>{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, index) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: catIndex * 0.2 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
