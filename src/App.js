import React from "react";
import { Provider } from "unstated";
import Tab from "./components/tab";
import DenseAppBar from "./components/DenseAppBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Add from "./components/add";

class App extends React.Component {
  render() {
    return (
      <div>
        <DenseAppBar />
        <div style={{ padding: "50px 10px", width: "800px", margin: "auto" }}>
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={Tab} />
                <Provider>
                  <Route path="/add" component={Add} />
                </Provider>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;