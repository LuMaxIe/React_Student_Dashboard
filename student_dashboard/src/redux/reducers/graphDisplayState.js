const initialDisplayState = {
  'Avg difficulty': true,
  'Avg fun': true,
  'Display Count': null,
  'Display count start': null,
  'Data Type': 'assignment',
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