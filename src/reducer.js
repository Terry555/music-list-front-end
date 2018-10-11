const defaultState = {
  artistName: '',
  artistBio: '',
  artistImage: null,
  searchTerm: ''
}


function reducer(state=defaultState, action){
  switch(action.type){
    case "SHOW NAME":
    return {...state, artistName: action.payload}
    case "SHOW BIO":
    return {...state, artistBio: action.payload}
    case "SHOW IMAGE":
    return {...state, artistImage: action.payload}
    case "GET SEARCH TERM":
    return {...state, searchTerm: action.payload}
    default:
      return state
  }
}

export default reducer
