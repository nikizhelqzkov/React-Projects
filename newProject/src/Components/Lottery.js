import React, {Component} from 'react';

class Lottery extends Component {
  renderButton() {
    const {remainingTickets, actions} = this.props;
    if (remainingTickets > 0) {
      return <button onClick={actions.registerTicket}>Купи билет</button>;
    }
  }
  render() {
    return (
      <div>
        <h2>Лотария</h2>
        {this.renderButton()}
        <br />
        <small>Оставащи билети: {this.props.remainingTickets}</small>
      </div>
    );
  }
}
export default Lottery;
