const defaultState = {
  allSearches: [],
  searchTerm: '',
  oneArtist: [],
  isClicked: false,
  savedArtists: [],
  currentUser: [],
  currentUsersArtists: [],
  currentUsersRecommendations: [],
  currentUsersTags: [],
  modalOpen: false
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
    case "SELECT SAVED ARTISTS":
    return {...state, savedArtists: action.payload}
    case "SET CURRENT USER":
    return {...state, currentUser: action.payload}
    case "SET CURRENT USERS ARTISTS":
    return {...state, currentUsersArtists: action.payload}
    case "SET CURRENT USERS RECOMMENDATIONS":
    return {...state, currentUsersRecommendations: action.payload}
    case "SET CURRENT USERS TAGS":
    return {...state, currentUsersTags: action.payload}
    case "HANDLE MODAL CLOSE":
    return {...state, modalOpen: false}
    case "HANDLE MODAL OPEN":
    return {...state, modalOpen: true}
    default:
      return state
  }
}

export default reducer
