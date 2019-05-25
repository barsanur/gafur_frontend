import React from 'react';
import {Modal, Form, Input, Select } from "antd";

const Searchs = Input.Search;
class Search extends React.Component {
    
    state = {
        id: null,
        filter: "",

        editBookData:{
            id: '',
            word:'',
            theme:'',
            example:'',
            level:''
        },

        modal1Visible: false,
        editBookModal: false
        
    };

    componentDidMount() {
        this.load_data();
    };

    load_data = async () => {
        const url = 'http://localhost:5000/questions'
        const response = await fetch(url)
        const data = await response.json();
        this.setState({ datas: data })
        
    };
   
  
    
    onClickDelete = async (id)=> {
        console.log("id delete: ",id)
        const sett = {
            method: 'delete',
        }
        
        const delete_id = await fetch('http://localhost:5000/questions/'+id, sett )
        
        this.setState(
            this.load_data()
        )     
    }

    toggleEditBookModal(){
        this.setState({
            editBookModal: !this.state.editBookModal
        })
    }

    updateBook(){
        let {word,theme,example, level} = this.state.editBookData;
        axios.put('http://localhost:5000/questions/' + this.state.editBookData.id,{
            word,theme,example, level
        }).then((response) => {
            this.load_data();
            console.log(response.data,"LALALA")

            this.setState({
                modal1Visible:false,
                editBookData:{word:'',theme:'',example:'',level:''},
            })

        });
    }
    
    editBook(id,word,theme,example,level){
        this.setState({
            editBookData:{id,word,theme,example,level},
             modal1Visible: ! this.state.modal1Visible,

        });
    }
    setModal1Visible(modal1Visible) {
        this.setState({ modal1Visible });
      }

    handleChange = event => {
        this.setState({ filter: event.target.value });
    };

    levelChangeHandler = value => {
        this.setState({ ["level"]: value });
      };

    render() {

        const { filter, datas } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = datas && datas.filter(item => {
            return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(lowercasedFilter),
            );
        });

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 }
          };
        //   const success = () => {
        //     this.setModal1Visible(false);
        //     message.success("Data succesfully Updated", 2);
        //   };
        const Option = Select.Option;
        return (
            <div>

                <Searchs style={{ width: 200 }} value={filter} placeholder='Search' onChange={this.handleChange} />
                <br />
                <br />


                <table className='customers'>
                    <tbody>

                        <tr>
                            <th>ID</th>
                            <th>Word</th>
                            <th>Theme</th>
                            <th>Example</th>
                            <th>Level</th>
                            <th>Action</th>
                        </tr>

                        {filteredData && filteredData.map(item => (


                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.word}</td>
                                <td>{item.theme}</td>
                                <td>{item.example}</td>
                                <td>{item.level}</td>
                                <td>
                                    <button onClick={this.editBook.bind(this,item.id, item.word, item.theme, item.example, item.level)}   className="btn btn-info">Edit</button>
                                    <button style={{marginLeft:20}} onChange={this.handleChangeDelete} onClick={this.onClickDelete.bind(this,item.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

                <Modal
          title="Add data"
          style={{ top: 20 }}
          toggle={this.toggleEditBookModal.bind(this)}
          isOpen={this.state.editBookModal}
          visible={this.state.modal1Visible}
          onOk={() => this.setModal1Visible(false)}
          onCancel={() => this.setModal1Visible(false)}
          footer={null}
          width={415}
        >
          <Form style={{paddingTop: 3}} layout="vertical" onSubmit={this.updateBook}>
            <Form.Item {...formItemLayout} label="Word">
              <Input
                type="text"
                
                onChange = {(e) =>  {
                    let {editBookData} = this.state;
                    editBookData.word = e.target.value;
                    this.setState({editBookData});
                }}
                value={this.state.editBookData.word}
                
                placeholder="Word"
              />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Theme">
              <Input
                type="text"
                value={this.state.editBookData.theme}
                onChange = {(e) =>  {
                    let {editBookData} = this.state;
                    editBookData.theme = e.target.value;
                    this.setState({editBookData});
                }}
                placeholder="Theme"
              />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Example">
              <Input
                type="text"
                value={this.state.editBookData.example}
                onChange = {(e) =>  {
                    let {editBookData} = this.state;
                    editBookData.example = e.target.value;
                    this.setState({editBookData});
                }}
                placeholder="Example"
              />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Level">
              <Select
                name="level"
                value={this.state.editBookData.level}
                onChange={(e) =>  {
                    let {editBookData} = this.state;
                    editBookData.level = e;
                    this.setState({editBookData});
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
            <Form.Item>
              <button
                style={{ float: "right", marginLeft: 10 }}
                className="btn btn-success"
                onClick={this.updateBook.bind(this)}
                
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
            </div>
        );
    }
}
export default Search