const csvDataToObjectArray = (dataString) => {
  const splitString = dataString.split('\r\n');
  const splitHeaders = splitString.splice(0, 1)[0].split(',');
  const parsed = splitString.map((x) => {
    const splitScore = x.split(',');
    return {
      [splitHeaders[0]]: splitScore[0],
      [splitHeaders[1]]: splitScore[1],
      [splitHeaders[2]]: splitScore[2],
      [splitHeaders[3]]: splitScore[3],
    }
  })
  return parsed
}

export default csvDataToObjectArray;


