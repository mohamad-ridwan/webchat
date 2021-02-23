import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import { createStore } from 'redux';
import counterReducer from './services/redux/reducer';
import { Provider } from 'react-redux';
import WrappContextProvider from './services/context/WrappContext';

function App() {

  const store = createStore(counterReducer)

  return (
    <div className="App">
      <Provider store={store}>
        <WrappContextProvider>
          <BrowserRouter>
            <Switch>

              <Route path='/sign-in'>
                <Signin />
              </Route>

              <Route path='/'>
                <Home />

              </Route>
            </Switch>

          </BrowserRouter>
        </WrappContextProvider>
      </Provider>
    </div>
    // TES
  );
}

export default App;
