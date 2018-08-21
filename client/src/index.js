import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// axios.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' };
axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/' : 'https://devalpha.openode.io/';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
