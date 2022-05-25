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
  // Fetch 'data' & 'label' from state
const data = (graphData, displayObject) => {
  const labels = Object.keys(graphData);
  const data = {
    labels: function () {
      const startIndex = displayObject['Display count start'] === null ? 0 : displayObject['Display count start'];
      const endIndex = displayObject['Display Count'] === null ? labels.length : displayObject['Display Count'];
      return startIndex < endIndex ? labels.slice(startIndex, endIndex) : labels;
    }(),
    datasets: [
      {
        type: 'line',
        label: 'Avg difficulty',
        borderColor: '#fff',
        borderWidth: 2,
        fill: false,
        data: counter(graphData, labels, displayObject["Display Count"], 'averageDifficultyScore', displayObject["Display count start"]),
      },
      {
        type: 'line',
        label: 'Avg fun',
        borderColor: '#66e7db',
        borderWidth: 2,
        fill: false,
        data: counter(graphData, labels, displayObject["Display Count"], 'averageFunFactorScore', displayObject["Display count start"]),
      },
      {
        type: 'bar',
        label: 'Total difficulty scores',
        data: counter(graphData, labels, displayObject["Display Count"], 'Difficulty Scores', displayObject["Display count start"]),
        borderColor: '#a8ed91',
        borderWidth: 1,
        fill: false,
      },
      {
        type: 'bar',
        label: 'Total fun scores',
        borderColor: '#fa87a9',
        borderWidth: 1,
        fill: false,
        data: counter(graphData, labels, displayObject["Display Count"], 'Fun Factor Scores', displayObject["Display count start"]),
      },
    ].filter((x) => displayObject[x.label]),
  };
  return data
}


export default data