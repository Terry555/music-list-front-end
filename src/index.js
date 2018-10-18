import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './presentational/Login';
import SearchContainer from './containers/SearchContainer';
import SavedArtistsContainer from './containers/SavedArtistsContainer';

const store = createStore(reducer)

ReactDOM.render(

  <Provider store={store}>
      <Router>
          <React.Fragment>
            <Route exact path="/" component={App} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={SearchContainer} />
            <Route path="/saved" component={SavedArtistsContainer} />
          </React.Fragment>
      </Router>
  </Provider>,
  document.getElementById('root')
            );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
