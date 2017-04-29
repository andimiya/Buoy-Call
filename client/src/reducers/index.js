import { ADD_USERS } from '../actions';
import { ADD_USER_TO_STATE } from '../actions';
import { ADD_GRAPH_TO_STATE } from '../actions';
import { LOG_OUT_FROM_STATE } from '../actions';


const initialState = {
  loggedInUser: null,
  users: [],
  graph: ["test"]
}

function users(state=initialState , action){
  switch(action.type){
    case ADD_USERS:
    return Object.assign({}, state, {
      users: [
        ...state.users, {
          firstName: action.firstName, 
          lastName: action.lastName, 
          email: action.email, 
          password: action.password
        }
      ]
    })

    case ADD_USER_TO_STATE:
    return Object.assign({}, state, {
      loggedInUser: {
          id: action.id, 
          firstName: action.firstName, 
          lastName: action.lastName, 
          email: action.email
        }
    })

    case ADD_GRAPH_TO_STATE:
    return Object.assign({}, state, {
      graph: action.graph
    })

    case LOG_OUT_FROM_STATE:
    console.log("reducer logging out", action)
    return Object.assign({}, state, {
      loggedInUser: null
    })

    default: return state;
  }
}; 

export default users; 