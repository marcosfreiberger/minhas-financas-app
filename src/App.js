import React from 'react';

import Login from './views/Login';

import 'bootswatch/dist/flatly/bootstrap.css';
import './custom.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Login />
      </div>
    );
  }
}

export default App;
