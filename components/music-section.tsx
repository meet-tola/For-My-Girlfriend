'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Play, Pause } from 'lucide-react'
import MyAudio from './my-audio'


interface MusicCardProps {
    id: number
    title: string
    artist: string
    cover: string
    audioSrc: string
    isActive: boolean
    isVisible: boolean
  }
const songs = [
  {
    id: 1,
    title: "Your Fav Song",
    artist: "Funds By Davido",
    cover: "/funds-cover.jpg",
    audioSrc: "/funds.mp3"
  },
  {
    id: 2,
    title: "Perfect for you",
    artist: "Ed-Sheeran - Perfect",
    cover: "/perfect.jpg",
    audioSrc: "https://ia600301.us.archive.org/32/items/ok12345_20181117_0437/k-Perfect%20-%20Ed%20Sheeran.mp3"
  },
  {
    id: 3,
    title: "Road Trip Anthem",
    artist: "Jericho By Iniko",
    cover: "/jericho.jpg",
    audioSrc: "/jericho.mp3"
  }
]

export default function MusicSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardId = parseInt(entry.target.id.split('-')[1])
          if (entry.isIntersecting) {
            setActiveCard(cardId)
            setVisibleCards((prev) => [...new Set([...prev, cardId])])
          } else {
            setVisibleCards((prev) => prev.filter((id) => id !== cardId))
          }
        })
      },
      { threshold: 0.6 }
    )

    const cards = document.querySelectorAll('.music-card')
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-blue-900 to-black min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Songs That Remind Me of Us</h2>
        <div className="space-y-24">
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              id={song.id}
              title={song.title}
              artist={song.artist}
              cover={song.cover}
              audioSrc={song.audioSrc}
              isActive={activeCard === song.id}
              isVisible={visibleCards.includes(song.id)}
            />
          ))}
        </div>
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-white mb-8">This is from Me</h2>
          <MyAudio />
        </div>
      </div>
    </section>
  )
}
  
function MusicCard({ id, title, artist, cover, audioSrc, isVisible }: MusicCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
        setIsPlaying(true);
      }
    }
  };

  return (
    <div
      id={`card-${id}`}
      className={`music-card bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
    >
      <div className="relative">
        <Image src={cover} alt={`${title} by ${artist}`} width={300} height={300} className="w-full h-auto" />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100"
        >
          {isPlaying ? (
            <Pause className="w-16 h-16 text-white" />
          ) : (
            <Play className="w-16 h-16 text-white" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{artist}</p>
      </div>
      <audio ref={audioRef} src={audioSrc} loop />
    </div>
  );
}
