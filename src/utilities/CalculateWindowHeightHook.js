import { useEffect } from 'react'

export default function CalculateWindowHeightHook() {
// calucluleta size of 1% of window height and saves it to variable
// Proposal for new units to fix this 
// https://github.com/w3c/csswg-drafts/issues/4329
// Solution from Jonas Sandstedt comment 
// https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html

  useEffect(() => {
    function setDocHeight() {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`)
    }
    window.addEventListener('resize', setDocHeight())
    window.addEventListener('orientationchange', setDocHeight())

    return () => {
      // functions to be called when unmounted. not shure if it does anything here
      document.removeEventListener('resize', setDocHeight)
      document.removeEventListener('orientationchange', setDocHeight)
    }
  }, [])
  
  return (
    <></>
  )
}