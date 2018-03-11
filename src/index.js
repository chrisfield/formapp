import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store/store';
import registerServiceWorker from './registerServiceWorker';
import {updateFields} from 'redux-formkit';

store.dispatch(updateFields('exampleF', {
  hobbies: [
    {},
    {description: 'stamp collecting'}
  ],
  field1: 'One',
  field2: 'Another',
  isAgreed: true,
  rb2: 'G',
}));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
 document.getElementById('root'));
registerServiceWorker();
