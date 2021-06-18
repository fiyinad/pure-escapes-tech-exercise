import React from 'react';
import { AppStyles } from './AppStyles';
import Products from '../Products';

function App() {
  return (
      <AppStyles className="App">
          <header className="App-header">
              <Products />
          </header>
      </AppStyles>
  );
}

export default App;
