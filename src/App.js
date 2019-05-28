import React from "react";
import { Provider } from "unstated";
import Tab from "./components/tab";
import DenseAppBar from "./components/DenseAppBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Add from "./components/add";
import ViewComponent from "./components/view";
import DataTable from "./components/table.js";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <DenseAppBar />
          <div style={{ padding: "50px 10px", width: "800px", margin: "auto" }}>
            <div>
              <Switch>
                <Route exact path="/" component={Tab} />
                <Route path="/add/:id?" component={ViewComponent} />
                {/* <Route exact path="/table" component={DataTable} /> */}
                <Provider>
                  <Route path="/table" component={DataTable} />
                  <Route path="/table/add" component={ViewComponent} />
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