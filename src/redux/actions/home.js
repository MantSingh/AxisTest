import store from '../store';
import types from '../types';
const {dispatch} = store;
export const setNumberOfUsers = data => {
  dispatch({
    type: types.SET_NUMBER_OF_USERS,
    payload: data,
  });
};

export const setUsersArray = data => {
  dispatch({
    type: types.USERS_ARRAY,
    payload: data,
  });
};
export const setSelectedUser = data => {
  dispatch({
    type: types.SET_SELECTED_USER,
    payload: data,
  });
};
export const setMessageInRedux = data => {
  dispatch({
    type: types.SET_MESSAGES,
    payload: data,
  });
};
