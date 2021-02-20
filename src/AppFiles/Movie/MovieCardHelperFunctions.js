export function nestedDataToString(nestedData) {
  let nestedArray = []
  if (nestedData !== undefined) {
    nestedData.forEach(item => {
      nestedArray.push(item.name)
    })
  }
  // returns string compiled from array
  return nestedArray.join(', ') 
}