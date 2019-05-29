import React from 'react';
import {Button, Icon, PageHeader, Tag, Typography} from 'antd';

import '../static/Question.css'

const {Paragraph} = Typography;

const ButtonGroup = Button.Group;

const content = (
    <div>
        <div className="content">
            <Paragraph>
                Ant Design interprets the color system into two levels: a system-level color system and a
                product-level color system.
            </Paragraph>

            

            <p className="contentLink">
                <a href="#test">
                    <Icon type="pic-right" /> Grammar
                </a>
            </p>
        </div>

    </div>
);

const extraContent = (
    <img
        src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
        alt="content"
    />
);



const Question = (props) => {
    return (
        <div>
            <ButtonGroup style={{margin: "10px 0"}}>
                <Button style={{width: "100px"}} size="large">A1</Button>
                <Button style={{width: "100px"}} size="large">A2</Button>
                <Button style={{width: "100px"}} size="large" type="primary">B1</Button>
                <Button style={{width: "100px"}} size="large">B2</Button>
                <Button style={{width: "100px"}} size="large">C1</Button>
                <Button style={{width: "100px"}} size="large">C2</Button>
            </ButtonGroup>
            <div>
                <PageHeader title="Peculiar" style={{border: "1px solid rgb(235, 237, 240)"}}
                            tags={<Tag color="magenta">There is going to be some example here</Tag>}>
                    <div className="wrap">
                        <div className="content">{content}</div>
                        <div className="extraContent">{extraContent}</div>
                    </div>
                </PageHeader>
            </div>
            <Button style={{margin: "10px 0"}} type="primary">Next Question</Button>
        </div>
    )
};

export default Question;