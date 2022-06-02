/* eslint-disable array-callback-return */
import dataAverages from "./dataAverages";

const counter = (data, labels, n_end, key, n_start) => {
  let num_end = n_end === null || n_end >= labels.length || n_end < n_start ? labels.length : n_end;
  let num_start = n_start === null || n_start < 1 || n_start > n_end ? 1 : n_start;
  let arr = [];
  for (let i = num_start - 1; i < labels.length; i++) {
    const assignmentData = data[labels[i]][key];
    if(key === 'Difficulty Scores' || key === 'Fun Factor Scores') {
      assignmentData.forEach((score) => {
        arr.push(score)
      })
    } else {
      arr.push(data[labels[i]][key])
    }
    if(i === (num_end)) { break }
  }
  return arr
}

const dataCreator = (assignmentScores, displayState) => {

  const chartLabels = function (){
    const labels = [...new Set(assignmentScores.map(
      x => x[displayState['Data Type']]
    ))];
    const startIndex = displayState['Display count start'] === null ? 0 : displayState['Display count start'] - 1;
    const endIndex = displayState['Display Count'] === null ? labels.length - 1 : displayState['Display Count'];
    return startIndex < endIndex ? labels.slice(startIndex, endIndex) : labels;
  }();

  const averages = dataAverages(assignmentScores, displayState['Data Type']);

  const dataSets = function () {
    let returnArray = [];

    if(displayState['Avg fun']) {
      returnArray.push({
        type: 'line',
        label: 'Avg fun',
        borderColor: '#fff',
        borderWidth: 2,
        fill: false,
        data: counter(averages, chartLabels, displayState["Display Count"], 'averageFunFactorScore', displayState["Display count start"]),
      })
    }

    if(displayState['Avg difficulty']) {
      returnArray.push({
        type: 'line',
        label: 'Avg difficulty',
        borderColor: '#fff',
        borderWidth: 2,
        fill: false,
        data: counter(averages, chartLabels, displayState["Display Count"], 'averageDifficultyScore', displayState["Display count start"]),
      })
    }
    const dataSetLabels = [...new Set(assignmentScores.map(x => x[displayState['Data Type'] === 'name' ? 'assignment' : 'name']))];
    dataSetLabels.forEach((label) => {
      returnArray.push({
        type: 'bar',
        label: label,
        borderColor: '#fa87a9',
        borderWidth: 1,
        fill: false,
        data: function () {
          let scoresArr = [];
          assignmentScores.forEach((item) => {
          if(item[displayState['Data Type'] === 'name' ? 'assignment' : 'name'] === label) {
            scoresArr.push(item['difficulty'])
          }
        })
        return scoresArr
        }(),
      })
    })
    return returnArray
  }()
  
  const data = {

    labels: chartLabels,

    datasets: dataSets,

  }
  return data
}

export default dataCreator
