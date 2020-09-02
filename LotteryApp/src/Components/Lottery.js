import React, {Component} from 'react';
import LotteryTicket from './LotteryTicket';
class Lottery extends Component {
  renderButton() {
    const {remainingTickets, actions} = this.props;
    if (remainingTickets > 0) {
      return <button onClick={actions.registerTicket}>Купи билет</button>;
    }
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
      <div>
        <h2>Лотария</h2>
        {this.renderButton()}
        <br />
        <small>Оставащи билети: {this.props.remainingTickets}</small>
        <br />
        <hr />
        {this.renderTicket()}
      </div>
    );
  }
}
export default Lottery;
