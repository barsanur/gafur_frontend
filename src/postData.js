// import React from "react";
// // import { Modal } from 'antd';
// // import {Button, Modal, Form, Input, Radio, Select} from 'antd';

// import { Button, Form, Col, Modal , Row} from 'react-bootstrap';


// class Postform extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             word: "",
//             theme: "",
//             example: "",
//             level: "",
//             visible: false,
//             show: false,
//         };
//     }

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
//         this.setState({
//           visible: true,
//         });
//       }
    
//       handleOk = (e) => {
//         console.log(e);
//         this.setState({
//           visible: false,
//         });
//       }
    
//       handleCancel = (e) => {
//         console.log(e);
//         this.setState({
//           visible: false,
//         });
//       }
    
   
  
//     handleClose = () => {
//         console.log("CLicked")
//       this.setState({ show: false });
//     }
  
//     handleShow = () => {
//       this.setState({ show: true });
//     }
      
//     render() {
//         const { word, theme, example, level } = this.state;
//         return (
//             <div>
               
                        
//                         <form onSubmit={this.submitHandler}>

//                             <input type="text" name="word" value={word} placeholder="Word" onChange={this.changeHandler}/>{" "}
//                             <input type="text" name="theme" value={theme} placeholder="Theme" onChange={this.changeHandler}/>{" "}
//                             <input type="text" name="example" value={example} placeholder="Example" onChange={this.changeHandler}/>{" "}
//                             <input type="text" name="level" value={level} placeholder="Level" onChange={this.changeHandler}/>{" "}

//                         <button className="btn btn-primary" type="submit">Submit</button>
//                         </form>

                
//             </div>
//         );
//     }
// }

// export default Postform;
