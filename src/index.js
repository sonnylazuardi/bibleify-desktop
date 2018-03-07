import React from 'react';
import { render } from 'react-dom';
import './assets/styles/main.scss';

import App from './app';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import * as models from './models';

const store = init({
  models,
});

// Since we are using HtmlWebpackPlugin WITHOUT a template,
// we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

// Now we can render our application into it
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
