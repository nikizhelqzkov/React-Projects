import React, {Component} from 'react';
import './App.css';
import './Menu.css';
import Lottery from './Components/Lottery';
import Final from './Components/Final';
import AppFooter from './Components/AppFooter';
import About from './Components/About';
import Contacts from './Components/Contacts';
import {registerTicket, removeTicket, finish, reset} from './Helper/actions';
import {getRandomNumber} from './Helper/utils';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

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
        className="Menu"
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu
          className="Menu"
          theme="dark"
          defaultSelectedKeys={[window.location.pathname]}
          mode="inline"
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Начало</Link>
          </Menu.Item>
          <Menu.Item key="/about" icon={<InfoCircleFilled />}>
            <Link to="/aboutUs"> За нас</Link>
          </Menu.Item>
          <Menu.Item key="/contacts" icon={<ContactsOutlined />}>
            <Link to="/contacts"> Контакти</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Layout style={{minHeight: '100vh'}}>
          {this.renderNav()}
          <Layout className="site-layout">
            <Content style={{textAlign: 'center'}}>
              <div className="app" style={{padding: 24, minHeight: 360}}>
                <Switch>
                  <Route path="/" exact component={() => this.renderApp()} />
                  <Route path="/aboutUs" component={About} />
                  <Route path="/contacts" component={Contacts} />
                </Switch>
              </div>
            </Content>
            <AppFooter />
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
