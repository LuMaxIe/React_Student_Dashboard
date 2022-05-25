/* eslint-disable array-callback-return */
import dataAverages from "./dataAverages";

const counter = (data, labels, n_end, key, n_start) => {
  let num_end = n_end === null || n_end >= labels.length || n_end < n_start ? labels.length : n_end;
  let num_start = n_start === null || n_start < 0 || n_start > n_end ? 0 : n_start;
  let arr = [];
  for (let i = num_start; i < labels.length; i++) {
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
      x => x[displayState.dataType === 'students' ? 'name' : 'assignment']
    ))];
    console.log(labels);
    console.log(displayState);
    const startIndex = displayState['Display count start'] === null ? 0 : displayState['Display count start'];
    const endIndex = displayState['Display Count'] === null ? labels.length : displayState['Display Count'];
    return startIndex < endIndex ? labels.slice(startIndex, endIndex) : labels;
  }();

  const averages = dataAverages(assignmentScores, displayState.dataType);

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
    const dataSetLabels = [...new Set(assignmentScores.map(x => x[displayState.dataType === 'students' ? 'assignment' : 'name']))];
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
          if(item[displayState.dataType === 'students' ? 'assignment' : 'name'] === label) {
            scoresArr.push(item['difficulty'])
          }
        })
        return scoresArr
        }(),
      })
    })
    console.log(returnArray);
    return returnArray
  }()
  
  const data = {

    labels: chartLabels,

    datasets: dataSets,

  }
  return data
}

export default dataCreator
