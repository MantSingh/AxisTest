import {View, Text} from 'react-native';
import React from 'react';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {Routes} from './src/Navigation/Routes';

const {dispatch} = store;

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
