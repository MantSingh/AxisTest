import types from '../types';

const initial_state = {};
export default function (state = initial_state, action) {
  switch (action.type) {
    case types.SET_NUMBER_OF_USERS: {
      const data = action.payload;
      return {...state, noOfUsers: data};
    }
    case types.USERS_ARRAY: {
      const data = action.payload;
      return {...state, usersArray: data};
    }
    case types.SET_SELECTED_USER: {
      const data = action.payload;
      return {...state, selectedUser: data};
    }
    case types.SET_MESSAGES: {
      const data = action.payload;
      return {...state, messages: data};
    }
    
    default: {
      return {...state};
    }
  }
}
