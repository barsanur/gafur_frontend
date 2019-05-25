import React from 'react';
import { Table, Button } from 'antd';



const columns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: 'Word',
  dataIndex: 'word',
}, {
  title: 'Theme',
  dataIndex: 'theme',
}, {
  title: 'Example',
  dataIndex: 'example',
}, {
  title: 'Level',
  dataIndex: 'level',
}];

class Questions extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  load_data = async () => {
    this.setState({ loading: true, data: [] });

    try {
      const data = await fetch("http://localhost:5000/questions");
      const json_data = await data.json()
  
      console.log('result', json_data);
  
      this.setState({
        loading: false,
        data: json_data
      });
    } catch(error) {
      console.log("error", error);
      this.setState({
        loading: false,
        data: []
      });
    }
  }

  componentDidMount() {
    this.load_data();
  }

  start = () => {

    this.setState({ loading: true });

    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { loading, data, selectedRowKeys } = this.state;
    console.log(data)
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>

        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>

          <Button
            type="primary"
            onClick={this.load_data}
            loading={loading}
            style={{ marginLeft: "20px" }}
          >
            Load data
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}

          </span>
        </div>
        <Table rowKey='id' pagination={{ position: "both" }} rowSelection={rowSelection} columns={columns} dataSource={data} />

      </div>

    );
  }
}
export default Questions;