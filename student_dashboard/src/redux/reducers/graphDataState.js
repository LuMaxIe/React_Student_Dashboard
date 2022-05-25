import dataAverages from "../../helpers/dataAverages";
import raw from 'raw.macro';
import csvDataToObjectArray from '../../helpers/csvDataFetcher'

const scoresRaw = raw('../../data/assignment_scores.csv');
const scores = csvDataToObjectArray(scoresRaw);
const initialGraph = dataAverages(scores, 'assignment'); //remove this

//add scores as initial
// use scores as reset
const graphDataState = (state = initialGraph, action) => {
  switch (action.type) {
    case 'ASSIGNMENT_TOTALS':
      return dataAverages(action.payload, 'assignment');
    case 'STUDENT_TOTALS':
      return dataAverages(action.payload, 'name');;
    default:
      return state
  }
}

export default graphDataState