const dataAverages = (dataArray, averageType='assignment') => {
  const averagesObject = {};

  dataArray.forEach((score) => {
    if(!averagesObject[score[averageType]]) {
      averagesObject[score[averageType]] = {
        amountOfDifficultyScores: 1,
        averageDifficultyScore: [Number(score.difficulty)],
        amountOfFunFactorScores: 1,
        averageFunFactorScore: [Number(score.funfactor)],
      }
    } else {
      averagesObject[score[averageType]].amountOfDifficultyScores += 1;
      averagesObject[score[averageType]].averageDifficultyScore.push(Number(score.difficulty));
      averagesObject[score[averageType]].amountOfFunFactorScores += 1;
      averagesObject[score[averageType]].averageFunFactorScore.push(Number(score.funfactor));
    }
  })

  for (const assignment in averagesObject) {
    const sumDifficulty = averagesObject[assignment].averageDifficultyScore.reduce((a, b) => a + b, 0);
    const averageDifficulty = sumDifficulty / averagesObject[assignment].amountOfDifficultyScores;
    averagesObject[assignment].averageDifficultyScore = Math.round((averageDifficulty + Number.EPSILON) * 100) / 100;

    const sumFunFactor = averagesObject[assignment].averageFunFactorScore.reduce((a, b) => a + b, 0);
    const averageFunFactor = sumFunFactor / averagesObject[assignment].amountOfFunFactorScores;
    averagesObject[assignment].averageFunFactorScore = Math.round((averageFunFactor + Number.EPSILON) * 100) / 100;
  }
  return averagesObject
}

export default dataAverages