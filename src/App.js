import React from "react";
// import Question from './components/tabs';
// import './App.css';
// import Questions from './Questions'
// import FetchRandomUser from './json';
// import Search from './Search';
// import Postform from './postData';
// import Modalform from './modal';
// import Tableform from './Table'
// import DataTable from './components/table.js';
// const TabPane = Tabs.TabPane;
// import { Provider } from 'unstated'
// import AddData from './components/add';
// import GridFroms from './components/search';
// import MainPage from './components/main'
import Tab from "./components/tab";
import DenseAppBar from "./components/DenseAppBar";

// import Las from './components/edit';
// import { Form } from 'antd';

class App extends React.Component {
  render() {
    return (
      <div> 
        <DenseAppBar/>

        <div style={{ padding: "50px 10px", width: "800px", margin: "auto" }}>
          {/* <Tableform  /> */}
          {/* <PostData /> */}
          {/* <GridFroms /> */}
          {/* <Las /> */}
          {/* <MainPage /> */}
          <Tab />
          {/* <Question/> */}
          {/* <Provider>
          <AddData />
          <br></br>
          <DataTable />
        </Provider>
         */}
          <br />
          {/* <Questions/> */}
        </div>
      </div>
    );
  }
}

export default App;
