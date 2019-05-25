import React from 'react';
import {Button ,Row, Col } from 'antd';

class GridFroms extends React.Component {
    render() {
        return (
            <div className="gutter-example">
            <Row gutter={16}>
              <Col className="gutter-row" span={4}>
                <Button type="primary" style={{width:150, height:150}} className="gutter-box">A1</Button>
              </Col>
              <Col className="gutter-row" span={4}>
              <Button type="primary" style={{width:150, height:150}} className="gutter-box">A2</Button>
              </Col>
              <Col className="gutter-row" span={4}>
              <Button type="primary" style={{width:150, height:150}} className="gutter-box">B1</Button>
              </Col>
              <Col className="gutter-row" span={4}>
              <Button type="primary" style={{width:150, height:150}} className="gutter-box">B2</Button>
              </Col>
              <Col className="gutter-row" span={4}>
              <Button type="primary" style={{width:150, height:150}} className="gutter-box">C1</Button>
              </Col>
              <Col className="gutter-row" span={4}>
              <Button type="primary" style={{width:150, height:150}} className="gutter-box">C2</Button>
              </Col>
            </Row>
          </div>
        );
    }
    
}
export default GridFroms