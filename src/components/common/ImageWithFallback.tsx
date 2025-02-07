import { useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
}

const ImageWithFallback = ({ src, alt, className = '' }: ImageWithFallbackProps) => {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <PhotoIcon className="w-12 h-12 text-gray-400" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}

export default ImageWithFallback 