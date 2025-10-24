import React from 'react';
import { useEffect, useState, useRef } from 'react'

// Rating component supports 0.5 increments (half-stars).
// Stores each user's rating in localStorage using key: rating-<songId>
export default function SongRating({ songId }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem(`rating-${songId}`)
    if (saved) setRating(parseFloat(saved))
  }, [songId])

  const handleClick = (e, value) => {
    setRating(value)
    localStorage.setItem(`rating-${songId}`, value)
  }

  // compute display value (if hovering show hover)
  const display = hover || rating

  return (
    <div
      className="flex items-center gap-2"
      ref={containerRef}
      onMouseLeave={() => setHover(0)}
    >
      <div className="flex" onMouseMove={(e)=>{
        // determine hovered half-star based on mouse position
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const total = rect.width
        const percent = x / total
        const value = Math.ceil(percent * 10) / 2  // maps to 0.5 increments up to 5
        setHover(Math.max(0.5, Math.min(5, value)))
      }}>
        {[1,2,3,4,5].map((n)=> {
          const leftFill = Math.min(1, Math.max(0, display - (n-1)))
          const fill = leftFill >= 1 ? 1 : (leftFill >= 0.5 ? 0.5 : 0)
          return (
            <Star
              key={n}
              index={n}
              fill={fill}
              onClick={(e, part)=>{
                // part: 'left' -> half, 'right' -> full
                const val = part === 'left' ? n - 0.5 : n
                handleClick(e, val)
              }}
            />
          )
        })}
      </div>
      <div className="w-16 text-right text-sm text-gray-300">
        {rating ? rating.toFixed(1) : '—'}
      </div>
    </div>
  )
}

function Star({ index, fill, onClick }) {
  // render a star allowing left half / right half clicks
  return (
    <div className="relative w-6 h-6 cursor-pointer" style={{lineHeight:0}}>
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <defs>
          <linearGradient id={`grad-${index}`}>
            <stop offset={fill === 1 ? '100%' : (fill === 0.5 ? '50%' : '0%')} stopColor="#f6c84c" />
            <stop offset={fill === 1 ? '100%' : (fill === 0.5 ? '50%' : '0%')} stopColor="#f6c84c" />
          </linearGradient>
        </defs>
        <path fill={fill ? 'url(#grad-' + index + ')' : 'none'} stroke="#6b7280" strokeWidth="1.2" d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.172L12 18.896l-7.336 3.874 1.402-8.172L.132 9.21l8.2-1.192z"/>
      </svg>

      {/* Left half click area */}
      <button
        onClick={(e)=>{ e.stopPropagation(); onClick(e, 'left') }}
        className="absolute left-0 top-0 w-1/2 h-full opacity-0"
        aria-label={`Rate ${index - 0.5} stars`}
      />
      {/* Right half click area */}
      <button
        onClick={(e)=>{ e.stopPropagation(); onClick(e, 'right') }}
        className="absolute right-0 top-0 w-1/2 h-full opacity-0"
        aria-label={`Rate ${index} stars`}
      />
    </div>
  )
}
