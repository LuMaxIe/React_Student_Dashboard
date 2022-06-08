import raw from 'raw.macro';
import csvDataToObjectArray from '../../helpers/csvDataFetcher'

const scoresRaw = raw('../../data/assignment_scores.csv');
const scores = csvDataToObjectArray(scoresRaw);

const assignmentScores = (state = scores, action) => {
  switch (action.type) {
    case 'ADD_SCORE':
      let stateCopy = Array.isArray(state) ? state.slice() : [];
      stateCopy.push(action.payload);
      return stateCopy
    default:
      return state
  }
} 

export default assignmentScores