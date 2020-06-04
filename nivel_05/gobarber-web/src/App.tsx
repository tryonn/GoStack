import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';
import GlobalStyles from './styles/global';
import AppProvider from './hook/';

import Routes from './routes';



const App: React.FC = () => (

  <>
    <AppProvider>
        <Route>
            <Routes />
        </Route>
    </AppProvider>
    <GlobalStyles />
  </>
);


export default App;
