import React from "react";
import { Button, Modal, Form, Input, Select, message } from "antd";
  
class Modalform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "",
      theme: "",
      example: "",
      level: "",
      visible: false,
      modal1Visible: false,
      modal2Visible: false,
      footer: null,
    };
  }

  
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  levelChangeHandler = value => {
    this.setState({ ["level"]: value });
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

      const data = await fetch("http://localhost:5000/questions", settings);
      
    } catch (Exception) {
      console.log("error while submitting", Exception);
    }
    
  };


  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    const success = () => {
      this.setModal1Visible(false);
      message.success("Data succesfully added", 2);
    };

    
    const { word, theme, example, level } = this.state;
    
    const Option = Select.Option;

    return (
      <div>
        <Button type="primary" onClick={() => this.setModal1Visible(true)}>
          Add
        </Button>
        <Modal
          title="Add data"
          style={{ top: 20 }}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
          footer={null}
          width={415}
        >
          <Form style={{paddingTop: 3}} layout="vertical" onSubmit={this.submitHandler}>
            <Form.Item {...formItemLayout} label="Word">
              <Input
                type="text"
                name="word"
                value={word}
                placeholder="Word"
                onChange={this.changeHandler}
              />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Theme">
              <Input
                type="text"
                name="theme"
                value={theme}
                placeholder="Theme"
                onChange={this.changeHandler}
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Example">
              <Input
                type="text"
                name="example"
                value={example}
                placeholder="Example"
                onChange={this.changeHandler}
              />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Level">
              {/* <Input type="text" name="level" value={level} placeholder="Level" onChange={this.changeHandler}/> */}
              <Select
                name="level"
                defaultValue="Nppp"
                value={level}
                onChange={this.levelChangeHandler}
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
              <button
                style={{ float: "right", marginLeft: 10 }}
                className="btn btn-success"
                onClick={success}
                type="submit"
              >
                Add
              </button>
              <button
                style={{ float: "right" }}
                className="btn btn-info"
                onClick={() => this.setModal1Visible(false)}
              >
                {" "}
                Close
              </button>
            </Form.Item>
          </Form>
        </Modal>
        <br />
        <br />
      </div>
    );
  }
}

export default Modalform;






//   const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
//     // eslint-disable-next-line
//     class extends  React.Component {
//       render() {
//         const {
//           visible, onCancel, onCreate, form,
//         } = this.props;
//         const { getFieldDecorator } = form;
//         const Option = Select.Option;
//         const formItemLayout = {
//             labelCol: { span: 4 },
//             wrapperCol: { span: 14 },
//           };
//         const onClickHan = () => {
//             console.log("OK Clicked...")
//         }
//         return (
//           <Modal
//             visible={visible}
//             title="Add new data"
//             okText="Add"

//             onCancel={onCancel}
//             onOk={onCreate}
//             style={{width: 150 }}
//           >
//             <Form {...formItemLayout} layout="vertical" onSubmit={this.submitHandler}>
//             <Form.Item  label="Word">
//                 {getFieldDecorator('word')(<Input placeholder="add word.." type="text" name="word" value={this.props.word}  onChange={this.changeHandler} />)}
//               </Form.Item>
//               <Form.Item  label="Theme">
//                 {getFieldDecorator('theme')(<Input placeholder="add theme.." type="text" name="theme" value={this.props.theme}  onChange={this.changeHandler} />)}
//               </Form.Item>

//               <Form.Item label="Examole">
//                 {getFieldDecorator('example')(<Input placeholder="add example.." type="text" name="example" value={this.props.example}  onChange={this.changeHandler} />)}
//               </Form.Item>

//               {/* <Form.Item className="collection-create-form_last-form-item">
//                 {getFieldDecorator('modifier', {
//                   initialValue: 'public',
//                 })(
//                   <Radio.Group>
//                     <Radio value="public">Public</Radio>
//                     <Radio value="private">Private</Radio>
//                   </Radio.Group>
//                 )}
//               </Form.Item> */}

//               <Form.Item {...formItemLayout} label="Level"onChange={this.changeHandler}>

//               <Select defaultValue="A1" style={{ width: 275 }}>
//                 <Option value="A1">A1</Option>
//                 <Option value="A2">A2</Option>
//                 <Option value="B1">B1</Option>
//                 <Option value="B2">B2</Option>
//                 <Option value="C1">C1</Option>
//                 <Option value="C2">C2</Option>
//                 </Select>
//               </Form.Item>
//               <button type='submit'> Add </button>
//             </Form>
//           </Modal>
//         );
//       }
//     }
//   );

//   class CollectionsPage extends React.Component {

//     state = {
//         word: "",
//         theme: "",
//         example: "",
//         level: "",
//         visible: false,
//         show: false,
//     };

//     changeHandler = e => {
//         this.setState({ [e.target.name]: e.target.value });
//     };

//     submitHandler = async e => {
//         e.preventDefault();
//         console.log(this.state);
//         const settings = {
//             method: "POST",
//             headers: {Accept: "application/json", "Content-Type": "application/json"},
//             body: JSON.stringify(this.state)
//         };
//         const data = await fetch("http://localhost:5000/questions", settings)
//             .then(response => {
//                 console.log(response);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//         return data;
//     };

//     showModal = () => {
//       this.setState({ visible: true });
//     }

//     handleCancel = () => {
//       this.setState({ visible: false });
//     }

//     handleCreate = () => {
//       const form = this.formRef.props.form;
//       form.validateFields((err, values) => {
//         if (err) {
//           return;
//         }

//         console.log('Received values of form: ', values);
//         form.resetFields();
//         this.setState({ visible: false });
//       });
//     }

//     saveFormRef = (formRef) => {
//       this.formRef = formRef;
//     }

//     render() {
//       return (
//         <div>
//           <Button type="primary" onClick={this.showModal}>Add data</Button>
//           <CollectionCreateForm
//             wrappedComponentRef={this.saveFormRef}
//             visible={this.state.visible}
//             onCancel={this.handleCancel}
//             onCreate={this.handleCreate}
//           />
//         </div>
//       );
//     }
//   }

// export default CollectionsPage
