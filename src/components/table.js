import React from "react";
import { Modal, Form, Input, Select, Popconfirm,Table , Icon} from "antd";
import dataContainer1 from "./container";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";




class DataTableComponent extends React.Component {
  componentDidMount() {
    this.props.dataContainer1.load_data();
  }

  render() {
    const columns = dataContainer1 => [
        { title: "Word", dataIndex: "word", key: "word", ...this.props.dataContainer1.getColumnSearchProps('word')},
        { title: "Theme", dataIndex: "theme", key: "theme",...this.props.dataContainer1.getColumnSearchProps('theme') },
        { title: "Example", dataIndex: "example", key: "example",...this.props.dataContainer1.getColumnSearchProps('example') },
        { title: "Level", dataIndex: "level", key: "level",...this.props.dataContainer1.getColumnSearchProps('level') },
        {
          title: "Action",
          dataIndex: "operation1",
          render: (text,record) =>
              <a  onClick={() => dataContainer1.editBook(record.id,record.word, record.theme,record.example,record.level)} href="javascript:void(0)">Edit</a>
        },
        {
          title: "Action",
          dataIndex: "operation",
      
          render: (text, record) => (
            <Popconfirm
            
              title="Sure to delete?"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => dataContainer1.onClickDelete(record.id)}
            >
              <a href="javascript:void(0)">Delete</a>
            </Popconfirm>
          )
        }
        
      ];
    const { dataContainer1 } = this.props;
    const formItemLayout = {
        labelCol: { span: 1 },
        wrapperCol: { span: 25 }
      };
    const Option = Select.Option;
    return (
      <div>
        <Link to="/table/add">Add data</Link>
  
        <Table
          columns={columns(dataContainer1)}
          dataSource={dataContainer1.state.questions}
        />
        <Modal
          title="Edit data"
          // style={{ top: 10 }}
          toggle={dataContainer1.toggleEditBookModal1.bind(dataContainer1)}
          isOpen={dataContainer1.state.visible1}
          visible={dataContainer1.state.visible1}
          onOk={dataContainer1.updateBook.bind(this)}
          onCancel={ () => dataContainer1.hideModal1()}
          // footer={null}
          width={370}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} style={{paddingTop: 3}} layout="vertical" onSubmit={dataContainer1.updateBook}>
            <Form.Item {...formItemLayout}>
              <Input
                onChange = {(e) =>  {
                    let {editBookData} = dataContainer1.state;
                    editBookData.word = e.target.value;
                    this.setState({editBookData});
                }}
                value={dataContainer1.state.editBookData.word}
                
                placeholder="Word"
              />
            </Form.Item>

            <Form.Item {...formItemLayout} >
              <Input
                type="text"
                value={dataContainer1.state.editBookData.theme}
                
                onChange = {(e) =>  {
                    let {editBookData} = dataContainer1.state;
                    editBookData.theme = e.target.value;
                    dataContainer1.setState({editBookData});
                }}
                placeholder="Theme"
              />
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Input
                type="text"
                value={dataContainer1.state.editBookData.example}
                onChange = {(e) =>  {
                    let {editBookData} = dataContainer1.state;
                    editBookData.example = e.target.value;
                    dataContainer1.setState({editBookData});
                }}
                placeholder="Example"
              />
            </Form.Item>

            <Form.Item {...formItemLayout}>
              <Select
                name="level"
                
                value={dataContainer1.state.editBookData.level}
                onChange={(e) =>  {
                    let {editBookData} = dataContainer1.state;
                    editBookData.level = e;
                    dataContainer1.setState({editBookData});
                }}
              >
                <Option value="A1">A1</Option>
                <Option value="A2">A2</Option>
                <Option value="B1">B1</Option>
                <Option value="B2">B2</Option>
                <Option value="C1">C1</Option>
                <Option value="C2">C2</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const DataTable = () => {
  return (
    <div>
      <Subscribe to={[dataContainer1]}>
        {dataContainer1 => <DataTableComponent dataContainer1={dataContainer1} />}
      </Subscribe>
    </div>
  );
};
export default DataTable;

