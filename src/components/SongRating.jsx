import React from 'react';
import { useEffect, useState } from 'react'

// Rating component supports 0.5 increments (half-stars) and calls onRateChange when rating changes
export default function SongRating({ songId, onRateChange }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem(`rating-${songId}`)
    if (saved) setRating(parseFloat(saved))
  }, [songId])

  const handleClick = (value) => {
    setRating(value)
    localStorage.setItem(`rating-${songId}`, value)
    if (onRateChange) onRateChange()
  }

  const display = hover || rating

  return (
    <div className="flex items-center gap-2" onMouseLeave={() => setHover(0)}>
      <div className="flex">
        {[1,2,3,4,5].map((n) => {
          let fill = 0
          if (display >= n) fill = 1
          else if (display >= n - 0.5) fill = 0.5

          return (
            <div key={n} className="relative w-6 h-6 cursor-pointer" style={{lineHeight:0}}
                 onMouseMove={(e)=>{
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const value = x < rect.width/2 ? n - 0.5 : n
                    setHover(value)
                 }}
                 onClick={()=>{
                   const value = hover || n
                   handleClick(value)
                 }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6">
                <defs>
                  <linearGradient id={`grad-${songId}-${n}`}>
                    <stop offset={fill === 1 ? '100%' : (fill === 0.5 ? '50%' : '0%')} stopColor="#f6c84c" />
                    <stop offset={fill === 1 ? '100%' : (fill === 0.5 ? '50%' : '0%')} stopColor="#f6c84c" />
                  </linearGradient>
                </defs>
                <path fill={fill ? `url(#grad-${songId}-${n})` : 'none'} stroke="#6b7280" strokeWidth="1.2"
                      d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.172L12 18.896l-7.336 3.874 1.402-8.172L.132 9.21l8.2-1.192z"/>
              </svg>
            </div>
          )
        })}
      </div>
      <div className="w-16 text-right text-sm text-gray-300">
        {rating ? rating.toFixed(1) : '—'}
      </div>
    </div>
  )
}


