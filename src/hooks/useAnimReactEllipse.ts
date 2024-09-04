import { RefObject, useEffect } from 'react'

interface IUseAnimReactEllipse {
  modelRef: RefObject<HTMLDivElement>
  rotation: number
  setRotation: (p: number) => void
  saturation: number
  setSaturation: (p: number) => void
  isAnimation: boolean | null
}

export function useAnimReactEllipse({
  modelRef,
  rotation,
  setRotation,
  saturation,
  setSaturation,
  isAnimation
}: IUseAnimReactEllipse) {
  useEffect(() => {
    if(isAnimation) {
      const handleScroll = () => {
        if (modelRef.current) {
          const rect = modelRef.current.getBoundingClientRect()
          const start = rect.top
          const end = rect.bottom
          if (window.scrollY >= start && window.scrollY < end) {
            setSaturation(saturation - 20)
            setRotation(rotation + 0.5)
          }
        }
      }
      if (saturation == -80) {
        setSaturation(500)
      }
      if (rotation == 50) {
        setRotation(1)
      }
      // Добавление обработчика события
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [modelRef, saturation, rotation, setRotation, setSaturation, isAnimation])
}
