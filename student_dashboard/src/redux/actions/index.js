export const addScore = (scoreObject) => {
  return {
    type: 'ADD_SONG',
    payload: scoreObject,
  }
}

export const setGraphData = (rawData) => {
  return {
    type: 'ASSIGNMENT_TOTALS',
    payload: rawData,
  }
}

export const setGraphDataStudents = (rawData) => {
  return {
    type: 'STUDENT_TOTALS',
    payload: rawData,
  }
}

export const adjustGraphDisplay = (displayObject) => {
  return {
    type: 'ADDJUST_GRAPH_DISPLAY',
    payload: displayObject
  }
}