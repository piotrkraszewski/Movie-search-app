import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useFetch (url) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      try{
        const response = await axios.get(url)
        setData(response.data.results)
        setError(null)
        setLoading(false)
      } catch (err) {
        console.warn(err.message)
        setError('Error fetching data. Try again.')
        setLoading(false)
      }
    })()
  }, [url])

  return {loading, data, error}
}