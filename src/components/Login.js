import React from "react";
import { Form, Icon, Input, Button } from "antd";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends React.Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        sessionStorage.setItem("_w", window.btoa(values.username + values.password));
        sessionStorage.setItem("_p", window.btoa("0011"+values.username + values.password));
        sessionStorage.setItem("_f", window.btoa("3344"+values.username + values.password));
        sessionStorage.setItem("_k", window.btoa("96421"+values.username + values.password));
        sessionStorage.setItem("_y", window.btoa("502664"+values.username + values.password));
        sessionStorage.setItem("_h", window.btoa("9832462"+values.username + values.password));
        sessionStorage.setItem("_l", window.btoa("02891346"+values.username + values.password));
        this.props.history.push("/table");
      }
    });
  };

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched
    } = this.props.form;

    // Only show error after a field is touched.
    const usernameError =
      isFieldTouched("username") && getFieldError("username");
    const passwordError =
      isFieldTouched("password") && getFieldError("password");
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={usernameError ? "error" : ""}
          help={usernameError || ""}
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? "error" : ""}
          help={passwordError || ""}
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: "login" })(Login);
export default WrappedHorizontalLoginForm;
