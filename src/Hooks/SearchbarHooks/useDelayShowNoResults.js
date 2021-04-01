import {useState, useEffect} from 'react'

export default function useDelayShowNoResults(msDelay, stringDependency) {
  // delays showing of NoResults component fot "msDelay" miliseconds

  const [showNoResults, setShowNoResults] = useState(false)

  useEffect(() => {
    if(stringDependency === ''){
      setShowNoResults(false)
    } else {
      const timer = setTimeout(() => {
        setShowNoResults(true)
      }, msDelay);
      return () => clearTimeout(timer);
    }
  }, [stringDependency, msDelay]);


  return showNoResults
}