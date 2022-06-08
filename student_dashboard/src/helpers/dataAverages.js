const dataAverages = (dataArray, averageType='assignment') => {
  const averagesObject = {};
  
  dataArray.forEach((score) => {
    if(!averagesObject[score[averageType]]) {
      averagesObject[score[averageType]] = {
        'Difficulty Scores': [Number(score.difficulty)],
        averageDifficultyScore: [Number(score.difficulty)],
        'Fun Factor Scores': [Number(score.funfactor)],
        averageFunFactorScore: [Number(score.funfactor)],
      }
    } else {
      averagesObject[score[averageType]]['Difficulty Scores'].push(Number(score.difficulty));
      averagesObject[score[averageType]].averageDifficultyScore.push(Number(score.difficulty));
      averagesObject[score[averageType]]['Fun Factor Scores'].push(Number(score.funfactor));
      averagesObject[score[averageType]].averageFunFactorScore.push(Number(score.funfactor));
    }
  })

  for (const assignment in averagesObject) {
    const sumDifficulty = averagesObject[assignment].averageDifficultyScore.reduce((a, b) => a + b, 0);
    const averageDifficulty = sumDifficulty / averagesObject[assignment]['Difficulty Scores'].length;
    averagesObject[assignment].averageDifficultyScore = Math.round((averageDifficulty + Number.EPSILON) * 100) / 100;

    const sumFunFactor = averagesObject[assignment].averageFunFactorScore.reduce((a, b) => a + b, 0);
    const averageFunFactor = sumFunFactor / averagesObject[assignment]['Fun Factor Scores'].length;
    averagesObject[assignment].averageFunFactorScore = Math.round((averageFunFactor + Number.EPSILON) * 100) / 100;
  }
  return averagesObject
}

export default dataAverages