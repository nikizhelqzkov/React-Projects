import React, {Component} from 'react';
import LotteryTicket from './LotteryTicket';
import {Button, Container, Row, Col} from 'react-bootstrap';
import { Typography,Divider } from 'antd';


const{Title} = Typography;
class Lottery extends Component {
  renderButton() {
    const {remainingTickets, actions} = this.props;
    if (remainingTickets > 0) {
      return <Button  block onClick={actions.registerTicket}>Купи билет</Button>;
    }
    return <Button variant="success" block onClick={actions.finish}>Провери за печалба</Button>;
  }

  renderTicket() {
    const {tickets,actions} = this.props;
    const lotteryTicketsAction = {removeTicket:actions.removeTicket};
    const lotteryTickets = tickets.map((ticket, index) => {
      return (
        <LotteryTicket
          actions = {lotteryTicketsAction}
          color={ticket.color}
          number={ticket.number}
          index={index}
          key={index}
        />
      );
    });

    return lotteryTickets;
  }

  render() {
    return (
      <Container >
      <Row>
        <Col>
        <Title>Лотария</Title>
        {this.renderButton()}
        <br />
        <small>Оставащи билети: {this.props.remainingTickets}</small>
        <br />
        <Divider>Вашите билетчета</Divider>
        {this.renderTicket()}
     
      </Col>
      </Row>
      </Container>
    );
  }
}
export default Lottery;
