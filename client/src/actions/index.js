export const ADD_USER = 'ADD_USER';
export const ADD_USER_TO_STATE = 'ADD_USER_TO_STATE';

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