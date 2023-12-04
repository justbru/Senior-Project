import Header from './header/Header'
import React from 'react'
import Intro from './intro/Intro'
import About from './about/About'
import Research from './research/Research'
import Footer from './footer/Footer'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      exit={{ opacity: 0 }}
      key="home"
    >
      <Header />
      <Intro />
      <About />
      <Research />
      <Footer />
    </motion.div>
  )
}

export default Home
