export const ADD_USER = 'ADD_USER';

export function addUser( firstName, lastName, email, password){
  return {
    type: ADD_USER, 
    firstName, 
    lastName, 
    email,
    password
  }
}