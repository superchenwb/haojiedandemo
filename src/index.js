import React from 'react';
import dva from './utils/dva';
import Router from './router';

const app = dva({
  onError(e) {
    console.log('onError', e);
  },
});

const App = app.start(<Router />);

export default App;