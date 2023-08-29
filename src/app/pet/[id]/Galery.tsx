'use client'
import Image from 'next/image'
import { useState } from 'react'

interface GaleryProps {
  images: {
    id: string
    url: string
    pet_id: string
  }[]
}

export function Galery({ images }: GaleryProps) {
  const [imageIndex, setImageIndex] = useState(images[0].url)
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          className="absolute top-1/2 w-full -translate-y-1/2"
          src={imageIndex}
          alt=""
          width={1080}
          height={768}
        />
      </div>
      <div
        data-amount={images.length === 5}
        className="flex gap-4 px-16 data-[amount=true]:justify-between data-[amount=false]:justify-evenly"
      >
        {images &&
          images.map((image, i) => {
            return (
              <div
                className="relative h-20 w-20 overflow-hidden rounded-2xl transition-opacity hover:cursor-pointer data-[select=false]:opacity-50"
                data-select={imageIndex === image.url}
                key={i}
                onClick={() => setImageIndex(image.url)}
              >
                <Image
                  className="absolute left-1/2 h-full -translate-x-1/2"
                  src={image.url}
                  alt=""
                  width={80}
                  height={80}
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}
