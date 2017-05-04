import { ADD_USERS } from '../actions';
import { ADD_USER_TO_STATE } from '../actions';
import { ADD_GRAPH_TO_STATE } from '../actions';
import { LOG_OUT_FROM_STATE } from '../actions';
import { ADD_BUOY_YEARS_TO_STATE } from '../actions';
import { ADD_BUOY_ID_TO_STATE } from '../actions';
import { ADD_BUOY_YEAR_TO_STATE } from '../actions';
import { ADD_MONTH_TO_STATE } from '../actions';
import { ADD_SHARK_TO_STATE } from '../actions';
import { ADD_SHARK_NAME_TO_STATE } from '../actions';
import { CHANGE_DATA_TYPE } from '../actions';



const initialState = {
  loggedInUser: null,
  users: [],
  graph: null,
  years: [],
  buoyid: null,
  yy: null,
  mm: 1,
  shark_id: null,
  shark_name: null,
  datatype: 'wvht'
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

    case ADD_BUOY_YEARS_TO_STATE:
    return Object.assign({}, state, {
      years: action.years
    })

    case ADD_BUOY_ID_TO_STATE:
    return Object.assign({}, state, {
      buoyid: action.buoyid
    })

    case ADD_BUOY_YEAR_TO_STATE:
    return Object.assign({}, state, {
      yy: action.year
    })

    case ADD_MONTH_TO_STATE:
    return Object.assign({}, state, {
      mm: action.month
    })

    case ADD_SHARK_TO_STATE:
    return Object.assign({}, state, {
      shark_id: action.shark_id
    })

    case ADD_SHARK_NAME_TO_STATE:
    return Object.assign({}, state, {
      shark_name: action.shark_name
    })

    case CHANGE_DATA_TYPE:
    return Object.assign({}, state, {
      datatype: action.datatype
    })

    default: return state;
  }
};

export default users;
