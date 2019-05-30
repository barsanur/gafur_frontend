import React from "react";
import { Button, Icon, PageHeader, Tag, Typography } from "antd";
import "../static/Question.css";

const { Paragraph } = Typography;
const ButtonGroup = Button.Group;

const extraContent = (
  <img
    src="https://gw.alipayobjects.com/mdn/mpaas_user/afts/img/A*KsfVQbuLRlYAAAAAAAAAAABjAQAAAQ/original"
    alt="content"
  />
);

class Tab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeKey: "a1",
      panes: [
        { key: "a1", title: "A1" },
        { key: "a2", title: "A2" },
        { key: "b1", title: "B1" },
        { key: "b2", title: "B2" },
        { key: "c1", title: "C1" },
        { key: "c2", title: "C2" }
      ],
      tabData: []
    };
  }

  componentDidMount() {
    this.onChange("a1");
  }

  onChange = activeKey => {
    console.log(activeKey);
    this.setState({ activeKey }, () => {
      this.getData();
    });
  };

  getData = async () => {
    const response = await fetch(
      "http://localhost:5000/level/" + this.state.activeKey
    );
    const data = await response.json();
    console.log(data);
    data.sort(() => Math.random() - 0.5);
    this.setState({ tabData: data });
  };

  createButton = () => {
    let btn = [];
    for (let i = 0; i < this.state.panes.length; i++) {
      btn.push(
        <Button
          style={{ width: "100px" }}
          size="large"
          type={
            this.state.panes[i].key === this.state.activeKey ? "primary" : ""
          }
          key={this.state.panes[i].key}
          onClick={() => this.onChange(this.state.panes[i].key)}
        >
          {this.state.panes[i].title}
        </Button>
      );
    }
    return btn;
  };

  render() {
    const { tabData } = this.state;

    return (
      <div>
        <ButtonGroup style={{ margin: "10px 0" }}>
          {this.createButton()}
        </ButtonGroup>
        {tabData.length === 3 && (
          <div>
            <PageHeader
              title={tabData[0].word}
              style={{ border: "1px solid rgb(235, 237, 240)" }}
              tags={
                tabData[0].isNoun === 1 && (
                  <Tag color="magenta">
                    There is going to be some example here
                  </Tag>
                )
              }
            >
              <div className="wrap">
                <div className="content">
                  <Paragraph>{tabData[1].example}</Paragraph>

                  <p className="contentLink">
                    <a href="#test">
                      <Icon type="pic-right" /> {tabData[2].theme}
                    </a>
                  </p>
                  <p>
                    Überlegen Sie Sich zu dieser Kombination einen Satz oder
                    eine Situation
                  </p>
                </div>
                <div className="extraContent">{extraContent}</div>
              </div>
            </PageHeader>
          </div>
        )}

        <Button
          style={{ margin: "10px 0" }}
          type="primary"
          onClick={() => this.getData()}
        >
          Next Question
        </Button>
      </div>
    );
  }
}

export default Tab;
