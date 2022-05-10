const songTracker = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SONG':
      let stateCopy = Array.isArray(state) ? state.slice() : [];
      stateCopy.push(action.payload);
      return stateCopy
    case 'REMOVE_SONG':
      let stateCopyRemove = state.slice();
      stateCopyRemove.splice(stateCopyRemove.findIndex(x => x.songTitle === action.payload), 1)
      return stateCopyRemove
    default:
      return state
  }
} 

export default songTracker