import { motion } from 'framer-motion';

const loadingContainer = {
  width: '3rem',
  height: '2rem',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  margin: '0 auto'
}

const loadingCircle = {
  display: 'block',
  width: '0.5rem',
  height: '0.5rem',
  backgroundColor: 'white',
  borderRadius: '50%'
}

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    }
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    }
  },
};

const loadingCircleVariants = {
  start: {
    y: '-50%'
  },
  end: {
    y: '50%'
  }
}

const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeInOut"
}

export default function LoadingIcon() {
  return (
    <motion.div 
      style={loadingContainer}
      variants={loadingContainerVariants} 
      initial="start" 
      animate="end"
    >
      <motion.span 
        style={loadingCircle} 
        variants={loadingCircleVariants} 
        transition={loadingCircleTransition}
      />
      <motion.span 
        style={loadingCircle} 
        variants={loadingCircleVariants} 
        transition={loadingCircleTransition}
      />
      <motion.span 
        style={loadingCircle} 
        variants={loadingCircleVariants} 
        transition={loadingCircleTransition}
      />
    </motion.div>
  )
}