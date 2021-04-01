import { useState, useEffect } from 'react'

export default function useCreateArrayToDisplayAndFadeout(array, sliceNum = array.length, disappearDelay = 800) {
  // == Usage ==
  // 1. Delays disapperance of displayed data from fetched array
  // 2. Can give your app time to fadeout current displayed data

  // == How it works ==
  // creates clone of passed array.
  // cloned array is updated instantly when passed not empty array
  // cloned array is not updated for "disappearDelay" miliseconds when passed empty array. 

  const [clonedArray, setClonedArray] = useState([])

  useEffect(() => {
    const slicedArray = array
    .slice(0, sliceNum)

    if(array.length > 0){
      setClonedArray(slicedArray)
    } else {
      const timer = setTimeout(() => {
        setClonedArray(slicedArray)
      }, disappearDelay);
      return () => clearTimeout(timer);
    }
  }, [array, sliceNum, disappearDelay]);


  return clonedArray
}