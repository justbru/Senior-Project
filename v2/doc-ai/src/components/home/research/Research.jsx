import React from "react";
import { researchPoints } from "../../../data";
import { motion } from 'framer-motion'
import { staggerChildren, textVariant2 } from "../../../motion";
import { Card, CardHeader, Divider, CardBody } from "@nextui-org/react";

const Research = () => {
  return (
    <a className="anchor" href="/#research" id="research">
      <motion.section
        variants={staggerChildren}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="py-24"
      >
        <div className="mx-20">
          {/* heading */}
          <span className="block text-4xl font-bold tracking-wide pb-10 text-center">Our Research</span>
          <div className="flex justify-self-center gap-2 justify-between grid grid-cols-3 pb-8 text-center">
            {researchPoints.map((exp, i) => {
              return (
                <motion.div variants={textVariant2} key={i} >
                  <Card className="justify-self-center max-w-[450px] h-[350px]">
                    <CardHeader className="bg-brown-50 block text-lg font-bold tracking-wide py-4">
                      {exp.title}
                    </CardHeader>
                    <Divider />
                    <CardBody className="text-center leading-relaxed px-10 py-6">
                      {exp.detail}
                    </CardBody>
                    <Divider />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section >
    </a>
  );
};

export default Research;
