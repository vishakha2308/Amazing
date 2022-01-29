import React from 'react';
import {View,Text} from 'react-native';
import {MyStack} from './src/Route';
import rootReducer from './src/store/reducer';
import { createStore } from 'redux';
export const store  = createStore(rootReducer)
import { Provider } from 'react-redux'
const App =()=>{
  return(
    <Provider store ={store}>
    <MyStack />
    </Provider>
  )
}
export default App