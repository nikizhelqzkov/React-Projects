import React, {Component} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap';
class Final extends Component {
  renderWinning() {
    return (
      <>
        <h1>Честито!!!</h1>
        <h2>Ти спечели 1 милион лева</h2>
        <h3>Твоето печелившо число е: {this.props.winningNumber}</h3>
      </>
    );
  }

  renderLost() {
    return (
      <>
        <h1>О, не!</h1>
        <h2>Ти не позна числото!</h2>
        <h2>Пробвай отново!</h2>
        <h3>Печелившото число бе: {this.props.winningNumber}</h3>
      </>
    );
  }

  isWinning() {
    const {tickets, winningNumber} = this.props;
    for (const ticket of tickets) {
      if (ticket.number === winningNumber) {
        return true;
      }
    }
    return false;
  }

  bgColor() {
    return this.isWinning() ? 'Chartreuse' : 'Crimson';
  }
  render() {
    return (
      <Container
        fluid="sm"
        style={{padding: 5,  marginTop: 10,backgroundColor: this.bgColor()}}
      >
        <Row>
          <Col>
            {this.isWinning() ? this.renderWinning() : this.renderLost()}

            <Button variant="light" id="new" block onClick={this.props.actions.reset}>
              НОВО ТЕГЛЕНЕ
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Final;
