import { ADD_USERS } from '../actions';

const initialState = {
  users: []
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
    default: return state;
  }
}; 

export default users; 