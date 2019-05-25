import { Table, Button } from "antd";
import React from "react";

const columns = [
  { title: "Word", dataIndex: "word", key: "word" },
  { title: "Theme", dataIndex: "theme", key: "theme" },
  { title: "Example", dataIndex: "example", key: "example" },
  { title: "Level", dataIndex: "level", key: "id" },
  {
    title: "Action",
    dataIndex: "",
    render: () => <a href="javascript:;">Edit</a>,
  },
  {
    title: "Action",
    dataIndex: "",
    render: () => <a href="javascript:;">Delete</a>,
  }
];

class Tableform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      word: null
    };
  }

  componentDidMount() {
    this.load_data();
  }

  load_data = async () => {
    const url = "http://localhost:5000/questions";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data });
    console.log(data);
  };

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const { data } = this.state;
    // console.log(columns[2],'++++')
    return (
      <div>
          
        <Table columns={columns} dataSource={data} />
      </div>
    
    );
  }
}

export default Tableform;
