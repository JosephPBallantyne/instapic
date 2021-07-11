import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import ApiContextProvider from './contexts/apiContextProvider';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiContextProvider>
        <App />
      </ApiContextProvider>{' '}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
