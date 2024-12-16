'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function ForgiveMe() {
  const [isForgiving, setIsForgiving] = useState(false)

  const handleForgive = () => {
    setIsForgiving(true)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-green-100 to-blue-200">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-600">
          Will You Forgive Me?
        </h2>
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!isForgiving ? (
              <motion.div
                key="forgiveMeButton"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  onClick={handleForgive}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-xl rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Click here if you forgive me
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="thankYouMessage"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
                className="text-center"
              >
                <Card className="bg-white shadow-xl rounded-lg overflow-hidden max-w-2xl mx-auto">
                  <CardContent className="p-6">
                    <h3 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h3>
                    <p className="text-xl text-gray-700 mb-6">
                      Your forgiveness means the world to me. I promise to cherish and nurture our relationship every day.
                    </p>
                    <div className="relative pb-[56.25%] overflow-hidden rounded-lg">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      >
                        <source src="/thank-you.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

