import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion"

import Button from "./common/Button";

const StyledCircle = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: blueviolet;
`;

const PlainRect = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: royalblue;
`;

const StyledRect = styled(motion.div)`
  width: 200px;
  height: 200px;
  border-radius: 20px;
  border: 3px dotted red;
  pointer-events: none;
`;

const list = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
}

function FramerMotionEx() {
  const [isVisible, setIsVisible] = useState(true);
  const [move, setMove] = useState(false);
  const [variants, setVariants] = useState(false);

  return (
    <>
      <Button size="medium" outline onClick={() => { setIsVisible(visible => !visible); }}>
        Animation
      </Button>
      <StyledCircle
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.5
        }}
        transition={{ duration: 0.5 }}
      />

      <h2>Keyframes</h2>
      <PlainRect
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

      <h2>Variants</h2>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={list}
      >
        <motion.li variants={item}>item 1</motion.li>
        <motion.li variants={item}>item 2</motion.li>
        <motion.li variants={item}>item 3</motion.li>
      </motion.ul>
      
      <Button size="medium" outline onClick={() => { setMove(move => !move); }}>
        모션(이동, 회전)
      </Button>
      <StyledRect
        animate={
          move ? { x: 500, y: 50, rotate: 90 } : undefined
        }
        transition={{ type: "spring" }}
      />

      <h2>제스처 - 호버, 탭, 드래그 등</h2>
      <StyledCircle
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
      />

    </>
  );
}

export default FramerMotionEx;