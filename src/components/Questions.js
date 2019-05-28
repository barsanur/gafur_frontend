import React from "react";
import { Table, Input, Button, Icon, Form, Divider } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";

const data = [
  {
    key: "1",
    word: "John Brown",
    theme: 32,
    example: "New York No. 1 Lake Park",
    level: 434
  },
  {
    key: "2",
    word: "Joe Black",
    theme: 42,
    example: "London No. 1 Lake Park",
    level: 0
  },
  {
    key: "3",
    word: "Jim Green",
    theme: 32,
    example: "Sidney No. 1 Lake Park",
    level: 99
  },
  {
    key: "4",
    word: "Jim Red",
    theme: 32,
    example: "London No. 2 Lake Park",
    level: 77
  }
];

class Questions extends React.Component {
  state = {
    searchText: "",
    data:[]
  };

  loadData = async () => {
    const url = "http://localhost:5000/questions";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ data: data });
  };

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.match.params);
    console.log("Table reload");
    this.loadData();
    // if(this.props.match.params.reload === 'reload'){
    // }
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  navigateToView = val => {
    console.log("navigateToView", val);
    // return <Redirect to="/table/add" />;
    let { history } = this.props;
    history.push({
      pathname: "/table/view/"+val
    });
  };

  render() {
    const columns = [
      {
        title: "Word",
        dataIndex: "word",
        key: "word",
        width: "30%",
        ...this.getColumnSearchProps("word"),
        render: (text, row, index) => {
          return (
            <a href="javascript:;" onClick={() => this.navigateToView(row.id)}>
              {text}
            </a>
          );
        }
      },
      {
        title: "Theme",
        dataIndex: "theme",
        key: "theme",
        width: "20%",
        ...this.getColumnSearchProps("theme")
      },
      {
        title: "Example",
        dataIndex: "example",
        key: "example",
        ...this.getColumnSearchProps("example")
      },
      {
        title: "Level",
        dataIndex: "level",
        key: "level",
        ...this.getColumnSearchProps("level")
      },
      {
        title: "",
        key: "action",
        render: (text, record) => (
          <span>
            {/* <a href="javascript:;">Edit {record.name}</a>
            <Divider type="vertical" /> */}
            <a href="javascript:;">Delete</a>
          </span>
        )
      }
    ];
    return (
      <div>
        <Link to="/table/view">Add data</Link>
        <Table columns={columns} dataSource={this.state.data} bordered rowKey="id" />;
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "question" })(Questions);

export default WrappedNormalLoginForm;
