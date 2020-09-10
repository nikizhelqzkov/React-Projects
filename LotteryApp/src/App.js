import React, {Component} from 'react';
import './App.css';
import Lottery from './Components/Lottery';
import Final from './Components/Final';
import AppFooter from './Components/AppFooter';
import {registerTicket, removeTicket, finish, reset} from './Helper/actions';
import {getRandomNumber} from './Helper/utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import {Layout, Menu} from 'antd';
import {
  HomeOutlined,
  InfoCircleFilled,
  ContactsOutlined,
} from '@ant-design/icons';

const {Content, Sider} = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winningNumber: getRandomNumber(),
      tickets: [],
      remainingTickets: 5,
      finished: false,
      collapsed: true,
    };

    this.registerTicket = registerTicket.bind(this);
    this.removeTicket = removeTicket.bind(this);
    this.finish = finish.bind(this);
    this.reset = reset.bind(this);
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed});
  };

  renderApp() {
    const {tickets, remainingTickets, finished, winningNumber} = this.state;
    const actions = {};

    if (finished) {
      actions.reset = this.reset;
      return (
        <Final
          tickets={tickets}
          winningNumber={winningNumber}
          actions={actions}
        />
      );
    }

    actions.registerTicket = this.registerTicket;
    actions.removeTicket = this.removeTicket;
    actions.finish = this.finish;

    return (
      <Lottery
        actions={actions}
        tickets={tickets}
        remainingTickets={remainingTickets}
      />
    );
  }

  renderNav() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="/" icon={<HomeOutlined />}>
            Начало
          </Menu.Item>
          <Menu.Item key="/about" icon={<InfoCircleFilled />}>
            За нас
          </Menu.Item>
          <Menu.Item key="/contacts" icon={<ContactsOutlined />}>
            Контакти
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        {this.renderNav()}
        <Layout className="site-layout">
          <Content style={{textAlign: 'center'}}>
            <div className="app" style={{padding: 24, minHeight: 360}}>
              {this.renderApp()}
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    );
  }
}

export default App;
