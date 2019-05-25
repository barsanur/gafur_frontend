import React from 'react';
import { Tabs, Alert, Row, Col, Button } from 'antd';

const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      {  key: 'a1', title: 'A1'},
      {  key: 'a2', title: 'A2'},
      {  key: 'b1', title: 'B1'},
      {  key: 'b2', title: 'B2'},
      {  key: 'c1', title: 'C1'},
      {  key: 'c2', title: 'C2'},
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
      tabData:[]
    };
  }

  componentDidMount() {
    this.onChange('a1'); 
  }

  onChange =  activeKey => {
    console.log(activeKey);
    this.setState({ activeKey }, () => {this.getData()});
  };

  getData = async () => {
    const response = await fetch("http://localhost:5000/level/" + this.state.activeKey);
    const data = await response.json();
    console.log(data)
    data.sort(() => Math.random() - 0.5);
    this.setState({tabData:data});
  };


  render() {
    
    const {activeKey, tabData, panes} = this.state; 

    return (
      <div>
        <Tabs
          onChange={this.onChange}
          activeKey={activeKey}
          style={{textAlign: 'center'}}
          
        >
          {panes.map(pane => (
            <TabPane tab={pane.title} key={pane.key}>
              <Row type="flex" justify="space-between">
              
              { tabData.length === 3 && 
                 <React.Fragment>
                  <Col span={6}> <Alert message={tabData[0].word} type="info" />
                  {
                    tabData[0].isNoun ===1 &&
                    <Alert message="Choose the Noun" type="info" showIcon />
                  }
                  </Col>
                  <Col span={6}><Alert message={tabData[1].theme} type="info" /></Col>
                  <Col span={6}><Alert message={tabData[2].example} type="info" /></Col>
                </React.Fragment>
              }
            
            </Row>
            </TabPane>
          ))}
        </Tabs>
  
        <Button style={{marginTop:'20px'}}  onClick={() => this.getData()}>Change</Button>
      </div>
    );
  }
}

export default Tab;