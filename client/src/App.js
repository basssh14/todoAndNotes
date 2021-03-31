import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import components
import Landing from "./Components/layout/Landing";
import LoginS from "./Components/layout/LoginS";
import LoginF from "./Components/layout/LoginF";
import PrivateRoute from "./routing/PrivateRoute";
import Alert from "./Components/individual/Alert";
//The redux stuff
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          <PrivateRoute exact path="/loginSuccess" component={LoginS} />
          <Route exact path="/loginFailure" component={LoginF} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
