import React from "react";
import { fadeIn, staggerContainer } from "../../../motion";
import { motion } from "framer-motion";
import Logo from './IntroLogo.png'

const Intro = () => {

  return (
    <div className="relative items-center justify-center py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }} S
      >
        {/* Top Left Quarter */}
        <div className="text-6xl font-bold tracking-wide absolute left-20 top-20">
          <motion.span variants={fadeIn("right", "tween", 0.2, 1)}>
            Welcome to
            <br />
            DocAI
          </motion.span>
        </div>

        {/* Top Right Quarter */}
        <div className="absolute text-xl text-right top-20 right-20">
          <motion.span variants={fadeIn("left", "tween", 0.4, 1)}>
            A virtual medical scribe
            <br />
            powered by artificial intelligence
          </motion.span>
        </div>

        {/* Centered Image */}
        <div className="flex-1 flex justify-center items-center">
          <motion.div variants={fadeIn("down", "tween", 0.3, 1)}>
            <motion.img src={Logo} alt="" />
          </motion.div>
        </div>

        {/* Bottom Left Quarter */}
        <div className="absolute text-xl bottom-20 left-20">
          <motion.div variants={fadeIn("right", "tween", 0.3, 1)}>
            <span>
              A Cal Poly senior project
            </span>
          </motion.div>
        </div>

        {/* Bottom Right Quarter */}
        <div className="absolute text-xl text-right bottom-20 right-20">
          <motion.div variants={fadeIn("left", "tween", 0.5, 1)}>
            <span>
              Developed by Riley Badnin and Justin Brunings
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>

  );
};

export default Intro;
