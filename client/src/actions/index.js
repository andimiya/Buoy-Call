export const ADD_USER = 'ADD_USER';
export const ADD_USER_TO_STATE = 'ADD_USER_TO_STATE';
export const ADD_GRAPH_TO_STATE = 'ADD_GRAPH_TO_STATE';
export const LOG_OUT_FROM_STATE = 'LOG_OUT_FROM_STATE';

export function addUser( firstName, lastName, email, password){
  return {
    type: ADD_USER, 
    firstName, 
    lastName, 
    email,
    password
  }
}

export function addUserToState(id, firstName, lastName, email){
  return {
    type: ADD_USER_TO_STATE,
    id,
    firstName,
    lastName,
    email
  }
}

export function addGraphToState(graph){
  console.log("action", graph)
  return {
    type: ADD_GRAPH_TO_STATE,
    graph
  }
}

export function logOutFromState(){
  console.log("logging out")
  return {
    type: LOG_OUT_FROM_STATE
  }
}