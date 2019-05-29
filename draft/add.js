import React from "react";
import { Button, Modal, Form, Input, Select, Checkbox } from "antd";
import DataContainer from "./container";
import { Subscribe } from "unstated";
import DataTable from "./table.js";
import ViewComponent from "./view";

class PostDataComponent extends React.Component {
  render() {
    const Option = Select.Option;
    
    const formItemLayout = {
      labelCol: { span: 1 },
      wrapperCol: { span: 25 }
    };

    const { dataContainer } = this.props;

    return (
      <div>
        <Button type="primary" onClick={() => dataContainer.showModal()}>
          Add
        </Button>

        <Modal
          toggle={dataContainer.toggleEditBookModal.bind(this)}
          title="Add data"
          visible={dataContainer.state.visible}
          onOk={dataContainer.submitHandler.bind(this)}
          onCancel={() => dataContainer.hideModal()}
          // okButtonProps={{ disabled: dataContainer.state.btnVisible }}
          okType={"primary"}
          // footer={null}
          width={370}
        >
          <Form
            style={{ paddingTop: 3 }}
            layout="vertical"
            onSubmit={dataContainer.submitHandler}
          >
            <Form.Item {...formItemLayout}>
              <Input
                type="text"
                name="word"
                value={dataContainer.state.word}
                placeholder="Word"
                onChange={dataContainer.changeHandler}
              />
            </Form.Item>

            <Form.Item {...formItemLayout}>
              <Input
                type="text"
                name="theme"
                value={dataContainer.state.theme}
                placeholder="Theme"
                onChange={dataContainer.changeHandler}
              />
            </Form.Item>
            <Form.Item {...formItemLayout}>
              <Input
                type="text"
                name="example"
                value={dataContainer.state.example}
                placeholder="Example"
                onChange={dataContainer.changeHandler}
              />
            </Form.Item>

            <Form.Item {...formItemLayout}>
              <Select
                // name="level"
                defaultValue="A1"
                value={dataContainer.state.level}
                onChange={dataContainer.levelChangeHandler}
              >
                <Option value="A1">A1</Option>
                <Option value="A2">A2</Option>
                <Option value="B1">B1</Option>
                <Option value="B2">B2</Option>
                <Option value="C1">C1</Option>
                <Option value="C2">C2</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Checkbox>Is noun? </Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
// const WrappedNormalLoginForm = Form.create({ name: 'normal_logins' })(PostDataComponent);

const AddData = () => {
  return (
    <div>
      <ViewComponent/>
      
      <Subscribe to={[DataContainer]}>
        {dataContainer => <PostDataComponent dataContainer={dataContainer} />}
      </Subscribe>
      <DataTable />
    </div>
  );
};

export default AddData;
