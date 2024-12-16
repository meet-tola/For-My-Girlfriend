"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Save } from "lucide-react";

export default function MyAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visualizerData, setVisualizerData] = useState<number[]>(
    new Array(50).fill(0)
  );
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        setDuration(audioRef.current!.duration);
      });

      audioRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(audioRef.current!.currentTime);
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        startVisualizer();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startVisualizer = () => {
    if (!audioRef.current) return;

    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audioRef.current);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    source.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);
      const normalizedData = Array.from(dataArray).map((value) => value / 255);
      setVisualizerData(normalizedData.slice(0, 50));
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Please Listen.
      </h3>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={togglePlayback}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 transition-colors duration-300"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className="relative h-24 bg-gray-100 rounded-lg overflow-hidden mb-4">
        {visualizerData.map((value, index) => (
          <div
            key={index}
            className="bg-blue-500 absolute bottom-0 w-1"
            style={{
              height: `${value * 100}%`,
              left: `${(index / visualizerData.length) * 100}%`,
              width: `${100 / visualizerData.length}%`,
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
      <audio
        ref={audioRef}
        src="/message.opus"
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
