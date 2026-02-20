import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import axios from 'axios'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/contact', formData)
      setStatus('Pesan berhasil dikirim!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('Gagal mengirim pesan. Coba lagi.')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          ref={ref}
        >
          Hubungi Saya
        </motion.h2>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3>Mari Berkolaborasi!</h3>
            <p>
              Punya proyek menarik atau ingin berdiskusi? Jangan ragu untuk
              menghubungi saya. Saya selalu terbuka untuk peluang baru.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <FaEnvelope />
                <span>email@example.com</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Daerahmu, Indonesia</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Nama Anda"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Anda"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Pesan Anda"
                rows="5"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Kirim Pesan
            </motion.button>
            {status && <p className="form-status">{status}</p>}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
