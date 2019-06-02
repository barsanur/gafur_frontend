import React from "react";
import Tab from "./components/tab";
import DenseAppBar from "./components/DenseAppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewComponent from "./components/view";
import Questions from "./components/Questions.js";
import Login from "./components/Login.js";
import {Provider} from 'unstated';

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <DenseAppBar />
          <div style={{ padding: "50px 0px", width: "90%", margin: "auto" }}>
            <div>
              <Switch>
                <Route exact path="/" component={Tab} />
                <Route path="/add/:id?" component={ViewComponent} />
                <Route exact path="/login" component={Login} />
                <Provider>
                  <Route path="/table/:reload?" component={Questions} />
                  <Route path="/table/view/:id?" component={ViewComponent} />
                </Provider>
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
