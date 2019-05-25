import React from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Input } from 'antd';
import { string } from 'prop-types';

class Las extends React.Component {
  state = { 
      visible: false,
      btnVisible: true
    };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleChange (e, value    ) {
        console.log(e.target.value)
        if (! e.target.value.trim() ){
            console.log("is empty...")
            this.setState({
                btnVisible: true,
              });
        }else{
            this.setState({
                btnVisible: false,
              });
            console.log("Not empty...")
        }
    }
  
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: this.state.btnVisible }}
          
        >
          <Input type="text" onChange={(e, value) => this.handleChange(e, value)}/>

        </Modal>
      </div>
    );
  }
}

export default Las