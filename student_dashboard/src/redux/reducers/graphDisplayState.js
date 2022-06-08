const initialDisplayState = {
  'Avg difficulty': true,
  'Avg fun': true,
  'Difficulty bars': true,
  'Fun bars': true,
  'Display Count': null,
  'Display count start': null,
  'Data Type': 'assignment',
  'Search key words': []
};

const graphDisplayState = (state = initialDisplayState, action) => {
  switch (action.type) {
    case 'ADDJUST_GRAPH_DISPLAY':
      return action.payload
    default:
      return state
  }
}

export default graphDisplayState;