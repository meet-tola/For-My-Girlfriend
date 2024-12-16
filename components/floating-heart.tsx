import React from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface FloatingHeartProps {
  x: number
  y: number
}

export const FloatingHeart: React.FC<FloatingHeartProps> = ({ x, y }) => {
  const randomOffset = () => (Math.random() - 0.5) * 100

  return (
    <motion.div
      className="absolute text-pink-500"
      initial={{ x, y, scale: 0, opacity: 0 }}
      animate={{
        x: x + randomOffset(),
        y: y - 100 - Math.random() * 50,
        scale: [1, 1.2, 1],
        opacity: [1, 1, 0],
        rotate: [0, (Math.random() - 0.5) * 30],
      }}
      transition={{
        duration: 2,
        ease: "easeOut",
        times: [0, 0.8, 1],
      }}
    >
      <Heart className="w-6 h-6 fill-current" />
    </motion.div>
  )
}

