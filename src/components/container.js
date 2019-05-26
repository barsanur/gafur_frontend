import React from "react";
import { Container } from "unstated";
import { Input, Button, Icon } from "antd";
import { message } from "antd";
import Highlighter from "react-highlight-words";

class DataContainer extends Container {
  state = {
    id: null,
    filter: "",
    datas: [],
    questions: [],

    searchText: "",

    editBookData: {
      id: "",
      word: "",
      theme: "",
      example: "",
      level: ""
    },
    visible: false,
    visible1: false,
    modal1Visible: false,
    editBookModal: false,
    btnVisible: true,
    wordInput: false,
    themeInput: false,
    exampleInput: false
  };

  toggleEditBookModal() {
    this.setState({
      visible: !this.state.visible
    });
  }
  toggleEditBookModal1() {
    this.setState({
      visible1: !this.state.visible1
    });
  }
  load_data = async () => {
    const url = "http://localhost:5000/questions";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ questions: data });
  };

  onClickDelete = async id => {
    const sett = {
      method: "delete"
    };
    await fetch("http://localhost:5000/questions/" + id, sett);

    this.setState(this.load_data());
    message.error("Was deleted");
  };

  submitHandler = async e => {
    e.preventDefault();
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    };

    try {
      await fetch("http://localhost:5000/questions", settings);
    } catch (Exception) {
      console.log("error while submitting", Exception);
    }
    this.load_data();
    this.hideModal();
  };

  success = () => {
    message.success("Data succesfully Updated", 2);
  };

  updateBook = async e => {
    e.preventDefault();
    const url = "http://localhost:5000/questions/" + this.state.editBookData.id;
    const settings = {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PUT",
      body: JSON.stringify(this.state.editBookData)
    };
    try {
      await fetch(url, settings);
    } catch (Exception) {
      console.log("Erroorrr", Exception);
    }
    this.setState({
      visible1: false,
      editBookData: { word: "", theme: "", example: "", level: "" }
    });
    this.load_data();
    this.success();
  };

  editBook(id, word, theme, example, level) {
    this.setState({
      editBookData: { id, word, theme, example, level },
      visible1: !this.state.visible1
    });
    console.log(this.state.editBookData);
  }
  showModal = () => {
    this.setState({ visible: true });
  };

  hideModal = () => {
    this.setState({ visible: false });
  };
  showModal1 = () => {
    this.setState({ visible1: true });
  };

  hideModal1 = () => {
    this.setState({ visible1: false });
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  levelChangeHandler = value => {
    this.setState({ level: value });
    console.log(this.state.level);
    
  };

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
}

export default DataContainer;
