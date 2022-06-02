/* eslint-disable array-callback-return */
const dataFilter = (dataArray, filterObject) => {
  let returnArray = [...dataArray];
  if(Object.keys(filterObject.filterEntireObjectOutIf).length > 0) {
    returnArray = returnArray.filter((item) => {
      for(const key in filterObject.filterEntireObjectOutIf) {
        if(item[key] !== filterObject.filterEntireObjectOutIf[key]) {
          return item
        }
      }
    })
  }
  
  if(filterObject.filterObjectEntries.length > 0) {
    returnArray = returnArray.map((filteredItem) => {
      for(const key of filterObject.filterObjectEntries) {
        if(key in filteredItem) {
          delete filteredItem[key]
        }
        return filteredItem
      }
    })
  }

  return returnArray
}

export default dataFilter

