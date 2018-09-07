import React from 'react';
import ReactDOM from 'react-dom';
import Home from './layout/container/Home';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'



ReactDOM.render(<BrowserRouter><Home /></BrowserRouter>,
  document.getElementById('root'));
  
registerServiceWorker();