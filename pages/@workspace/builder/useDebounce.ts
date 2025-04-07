import { useEffect } from 'react'

const useDebounce = <T>(value: T, delay: number, cb: (value: T) => void) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      cb(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])
}

export default useDebounce
