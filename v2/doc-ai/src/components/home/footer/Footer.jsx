import React from "react";
import { footerVariants, staggerChildren } from "../../../motion";
import { motion } from 'framer-motion'
import { Spacer } from "@nextui-org/react";

const Footer = () => {
  return (
    <a className="anchor" href="/#contact" id="contact">
      <motion.section
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="bg-brown-50 py-20"
      >
        <motion.div
          variants={footerVariants}
          className="gap-4 grid grid-cols-2 pt-4 mx-20 "
        >
          <div >
            <span className="text-6xl font-bold tracking-wide text-left">
              Get in touch.
            </span>
          </div>

          <div className="text-2xl tracking-wide text-right">
            <ul >
              <li>rbadnin@calpoly.edu</li>
              <Spacer y={4} />
              <li>jbrunings@calpoly.edu</li>
            </ul>
          </div>
        </motion.div>
      </motion.section>
    </a>
  );
};

export default Footer;
