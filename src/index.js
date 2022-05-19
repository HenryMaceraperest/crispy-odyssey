import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import { store } from './store/store.';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { HistoryItemsProvider } from './contexts/history-items.context';
import { ValidityProvider } from './contexts/validity.context';
import { BookingDataProvider } from './contexts/book-item.context';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HistoryItemsProvider>
          <ValidityProvider>
            <BookingDataProvider>
              <App />
            </BookingDataProvider>
          </ValidityProvider>
        </HistoryItemsProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
