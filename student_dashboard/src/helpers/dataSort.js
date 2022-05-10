/* eslint-disable array-callback-return */
const dataSort = (data, sortTypeForAverages='combinedAverages', sortTypeForRaw='name') => {
  if (!Array.isArray(data)) {
    return Object.fromEntries(
      Object.entries(data).sort(([, a], [, b]) => {
        switch (sortTypeForAverages) {
          case 'combinedAverages':
            return [a.averageDifficultyScore + a.averageFunFactorScore] - [b.averageDifficultyScore + b.averageFunFactorScore]
          case 'combinedAmounts':
            return [a.amountOfDifficultyScores + a.amountOfFunFactorScores] - [b.amountOfDifficultyScores + b.amountOfFunFactorScores]
          case 'averageDifficultyScore':
            return a.averageDifficultyScore - b.averageDifficultyScore;
          case 'averageFunFactorScore':
            return a.averageDifficultyScore - b.averageDifficultyScore;
          case 'amountOfDifficultyScores':
            return a.amountOfDifficultyScores - b.amountOfDifficultyScores;
          case 'amountOfFunFactorScores':
            return a.amountOfFunFactorScores - b.amountOfFunFactorScores;
          default:
            break;
        }
      })
    )
  }

  if(Array.isArray(data)) {
    return data.sort((a, b) => {
      if(a[sortTypeForRaw] < b[sortTypeForRaw]) {
        return -1;
      }
      if(a[sortTypeForRaw] > b[sortTypeForRaw]) {
        return 1;
      }
      return 0;
    })
  }
}

export default dataSort