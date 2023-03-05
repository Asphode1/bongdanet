import { useEffect, useState } from 'react'

export default function useDebounce(str: string, timeout: number) {
  const [string, setString] = useState<string>(str)

  useEffect(() => {
    const debounce = setTimeout(() => {
      setString(str)
    }, timeout)
    return () => clearTimeout(debounce)
  }, [str, timeout])

  return string
}
