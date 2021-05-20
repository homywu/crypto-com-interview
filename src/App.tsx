import React from 'react';
import { Provider } from 'react-redux';

import { store } from './stores';
import { Main } from './pages/main';

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
