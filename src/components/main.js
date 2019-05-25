import React from 'react';
import { Tabs, Alert, Row, Col, Button, message } from 'antd';

const TabPane = Tabs.TabPane;



class MainPage extends React.Component {

    state = {
      level_data:[],
      word:"Word",
      theme:"Theme",
      example:"Example"
    };
      // load_data = async () => {
      //   const url = "http://localhost:5000/questions";
      //   const response = await fetch(url);
      //   const data = await response.json();
      //   this.setState({ questions: data });
      // };

      onClickDelete = async level_id => {
        const response = await fetch("http://localhost:5000/level/" + level_id);
        const data = await response.json();
        console.log(data, 'dataaaa')
        this.setState({ level_data: data })
        console.log(this.state.level_data[0], 'ooooooo')

        // this.setState(this.load_data());
        message.error("Was deleted");
      };

      callback = async key => {
        console.log(key);
        const response = await fetch("http://localhost:5000/level/" + key);
        const data = await response.json();
        console.log(data)
      }
    render() {
        return (
            <div>
            <div style={{'padding':10}}>
            <Tabs  style={{textAlign: 'center'}} defaultActiveKey="1" onTabClick={this.callback}>
            <TabPane tab="A1" key="a1" onChange={() => this.onClickLevelA1('a1')}>
            <Row type="flex" justify="space-around">
            <Col span={6}> <Alert message={this.state.word} type="info" /></Col>
            <Col span={6}><Alert message={this.state.theme} type="info" /></Col>
            <Col span={6}><Alert message={this.state.example} type="info" /></Col>
            </Row>
            </TabPane>
            <TabPane tab="A2" key="a2" onTabClick={() => this.onClickLevelA1('a2')}>
            <Row type="flex" justify="space-around">
            <Col span={6}> <Alert message="Word" type="info" /></Col>
            <Col span={6}><Alert message="Theme" type="info" /></Col>
            <Col span={6}><Alert message="Example" type="info" /></Col>
            </Row>
            </TabPane>
            <TabPane tab="B1" key="b1">
            <Row type="flex" justify="space-around">
            <Col span={6}> <Alert message="Word" type="info" /></Col>
            <Col span={6}><Alert message="Theme" type="info" /></Col>
            <Col span={6}><Alert message="Example" type="info" /></Col>
            </Row>
            </TabPane>
            <TabPane tab="B2" key="b2">
            <Row type="flex" justify="space-around">
            <Col span={6}> <Alert message="Word" type="info" /></Col>
            <Col span={6}><Alert message="Theme" type="info" /></Col>
            <Col span={6}><Alert message="Example" type="info" /></Col>
            </Row>
            </TabPane>
            <TabPane tab="C1" key="c1">
            <Row type="flex" justify="space-around">
            <Col span={6}> <Alert message="Word" type="info" /></Col>
            <Col span={6}><Alert message="Theme" type="info" /></Col>
            <Col span={6}><Alert message="Example" type="info" /></Col>
            </Row>
            </TabPane>
            <TabPane tab="C2" key="c2">
            <Row type="flex" justify="space-around">
            <Col span={6}> <Alert message="Word" type="info" /></Col>
            <Col span={6}><Alert message="Theme" type="info" /></Col>
            <Col span={6}><Alert message="Example" type="info" /></Col>
            </Row>
            </TabPane>
        </Tabs>
        </div>
        <div style={{textAlign:'center'}}> 
        <Button size='large' style={{'width':152, textAlign:'center'}} onClick={() => this.onClickDelete('c1')} className="text-center"  type="primary" >
                    Next Combination
        </Button>
        </div>
        
        </div>
          );
    }
}
 
export default MainPage;
  