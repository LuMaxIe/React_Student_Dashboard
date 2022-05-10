export const addSong = (songObj) => {
  return {
    type: 'ADD_SONG',
    payload: songObj
  }
}

export const removeSong = (indentifier) => {
  return {
    type: 'REMOVE_SONG',
    payload: indentifier,
  }
}