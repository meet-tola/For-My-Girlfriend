'use client'

import { useEffect, useState } from 'react'

export default function ScrollDownText() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      setIsVisible(scrollPosition + windowHeight < documentHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 right-8 transform rotate-90 origin-bottom-right">
      <p className="text-white text-lg font-semibold tracking-widest animate-pulse">
        Scroll Down
      </p>
    </div>
  )
}

