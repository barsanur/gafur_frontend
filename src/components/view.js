import React from "react";
import { Modal, Button, Form, Input, Checkbox, Select, message } from "antd";

class ViewComponent extends React.Component {
  state = {
    loading: false,
    visible: true,
    queryData: {
      // id: null,
      word: "",
      theme: "",
      example: "",
      level: "a1",
      isNoun: true
    }
  };

  getData = async id => {
    const url = "http://159.89.1.89:5000/questions/" + id;
    // const url = "http://localhost:5000/questions/" + id;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ queryData: data });
  };

  componentDidMount() {
    console.log('--- componentDidMount  ----');
    const { id } = this.props.match.params;
    if (id && id > 0) {
      this.getData(id);
    }
    this.setState({
      visible: true
    });
  }

  handleOk = async e => {
    console.log('--- handleOk  ----');
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      console.log(err);
      if (!err) {
        this.setState({ loading: true });


        console.log("Received values of form: ", values,this.state.queryData);

        // let url = "http://159.89.1.89:5000/questions";
        let url = "http://localhost:5000/questions";
        let settings = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values)
        };

        if(this.state.queryData.id){
          url = url + "/" + this.state.queryData.id;
          settings.method = "PUT";
        }

        console.log(url, settings);
        

        try {
          await fetch(url, settings);
          this.props.form.resetFields();
          this.setState({ visible: false });
          message.success("Saved");
        } catch (Exception) {
          console.log("error while submitting", Exception);
        }
        this.setState({ loading: false });
      }
    });
    console.log("set false loading ");
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  
  afterClose = () => {
    let { history } = this.props;
    history.push({
      pathname: "/table/reload/"
    });
  };

  handleSelectChange = level => {
    console.log('-----handleSelectChange');
  };

  render() {
    const { visible, loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    
    return (
      <div>
        <Modal
          visible={visible}
          centered
          title="Add data"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          afterClose={this.afterClose}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.handleOk}
            >
              Submit
            </Button>
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator("word", {
                initialValue: this.state.queryData.word,
                rules: [
                  {
                    required: true,
                    message: "Please input your word!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Word" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("theme", {
                initialValue: this.state.queryData.theme,
                rules: [
                  {
                    required: true,
                    message: "Please input your theme!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Theme" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("example", {
                initialValue: this.state.queryData.example,
                rules: [
                  {
                    required: true,
                    message: "Please input your example!",
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Example" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("level", {
                initialValue: this.state.queryData.level,
                rules: [
                  { required: true, message: "Please select your level!" }
                ]
              })(
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={this.handleSelectChange}
                >
                  <Option value="a1">A1</Option>
                  <Option value="a2">A2</Option>
                  <Option value="b1">B1</Option>
                  <Option value="b2">B2</Option>
                  <Option value="c1">C1</Option>
                  <Option value="c2">C2</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("isNoun", {
                valuePropName: "checked",
                initialValue: this.state.queryData.isNoun
              })(<Checkbox>Is noun</Checkbox>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "view" })(
  ViewComponent
);

export default WrappedNormalLoginForm;
