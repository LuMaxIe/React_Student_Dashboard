/* eslint-disable array-callback-return */
import dataAverages from "./dataAverages";
import assignmentsFilter from "./dataFilter";

const counter = (data, labels, key) => {
  let arr = [];
  labels.forEach((label) => {
    const assignmentData = data[label][key];
    if(key === 'Difficulty Scores' || key === 'Fun Factor Scores') {
      assignmentData.forEach((score) => {
        arr.push(score)
      })
    } else {
      arr.push(assignmentData)
    }
  })
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
        data: counter(averages, chartLabels, 'averageFunFactorScore'),
      })
    }

    if(displayState['Avg difficulty']) {
      returnArray.push({
        type: 'line',
        label: 'Avg difficulty',
        borderColor: '#fff',
        borderWidth: 2,
        fill: false,
        data: counter(averages, chartLabels, 'averageDifficultyScore'),
      })
    }

    const dataSetLabels = [...new Set(assignmentScores.map(x => x[displayState['Data Type'] === 'name' ? 'assignment' : 'name']))];
    if(displayState['Difficulty bars'] || displayState['Fun bars']) {
      dataSetLabels.forEach((label) => {
        if(displayState['Difficulty bars']) {
          returnArray.push({
            type: 'bar',
            label: `${label}: Difficulty`,
            borderColor: '#fa87a9',
            borderWidth: 2,
            fill: true,
            data: function () {
              let scoresArr = [];
              assignmentScores.forEach((item) => {
                if(item[displayState['Data Type'] === 'name' ? 'assignment' : 'name'] === label && chartLabels.includes(item[displayState['Data Type']])) {
                  if(displayState['Search key words'].length > 0)  {
                    if(assignmentsFilter(displayState['Search key words'], item, 'difficulty', displayState['Data Type'] === 'name' ? 'assignment' : 'name')) {
                      scoresArr.push(item['difficulty'])
                    } else {
                      scoresArr.push(0)
                    }
                  } else {
                    scoresArr.push(item['difficulty'])
                  }
                }
              })
              return scoresArr
            }(),
          })
        }

        if(displayState['Fun bars']) {
          returnArray.push({
            type: 'bar',
            label: `${label}: Fun factor`,
            borderColor: '#a8ed91',
            borderWidth: 2,
            fill: true,
            data: function () {
              let scoresArr = [];
              assignmentScores.forEach((item) => {
              if(item[displayState['Data Type'] === 'name' ? 'assignment' : 'name'] === label && chartLabels.includes(item[displayState['Data Type']])) {
                if(displayState['Search key words'].length > 0) {
                  if(assignmentsFilter(displayState['Search key words'], item, 'funfactor', displayState['Data Type'] === 'name' ? 'assignment' : 'name')) {
                    scoresArr.push(item['funfactor'])
                  } else {
                    scoresArr.push(0)
                  }
                } else {
                  scoresArr.push(item['funfactor'])
                }
              }
            })
            return scoresArr
            }(),
          })
        }
      })
    }
    return returnArray
  }()
  
  const data = {

    labels: chartLabels,

    datasets: dataSets,

  }
  return data
}

export default dataCreator
