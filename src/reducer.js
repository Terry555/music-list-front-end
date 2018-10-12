const defaultState = {
  allSearches: [],
  searchTerm: '',
  oneArtist: [],
  isClicked: false
}


function reducer(state=defaultState, action){
  switch(action.type){
    case "SHOW SEARCHES":
    return {...state, allSearches: action.payload}
    case "GET SEARCH TERM":
    return {...state, searchTerm: action.payload}
    case "SET ONE ARTIST":
    return {...state, oneArtist: action.payload}
    case "CHANGE CLICK":
    return {...state, isClicked: action.payload}
    default:
      return state
  }
}

export default reducer
