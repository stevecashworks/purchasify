import React from 'react';
import ReactDOM from 'react-dom/client';

//styling
import './index.css';

// state manangemmnt

import store  from './redux/store'
import {Provider} from 'react-redux'

import Wrapper from './AppWrapper';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Wrapper>
    
    </Wrapper>
  </Provider>
)
