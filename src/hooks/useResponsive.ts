// hooks/useResponsive.ts
import { useState, useEffect } from 'react'

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
}

export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setState({
        width,
        isMobile: width < 640, // sm breakpoint
        isTablet: width >= 640 && width < 768, // md breakpoint
        isDesktop: width >= 640 // sm and above
      })
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return state
}