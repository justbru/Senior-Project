import React from 'react'
import { WhatWeDo } from '../../../data.js'
import { motion } from 'framer-motion'
import { staggerContainer, textVariant } from '../../../motion.js'

const About = () => {
    return (
        <a className="anchor" href="/#about" id="about">
            <section className="bg-brown-50 py-20">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.25 }}
                    className="text-left"
                >

                    {/* center */}
                    <motion.div
                        variants={textVariant(0.5)}
                        className="mx-20"> {/* Adjusted margin to mx-4 for 20px space on left and right */}
                        <span className="block text-4xl font-bold tracking-wide mb-8">What is DocAI?</span>
                        {WhatWeDo.map((paragraph, i) => <span className='block text-lg mb-4' key={i}>{paragraph}</span>)}
                    </motion.div>
                </motion.div>
            </section>
        </a>
    )
}

export default About