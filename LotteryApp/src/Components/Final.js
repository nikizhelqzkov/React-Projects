import React, {Component} from 'react';
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
        <h1>Съжалявам!!!</h1>
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

  bgColor(){
    return this.isWinning()?'Chartreuse':'Crimson';
  }
  render() {
    return <div style={{padding:15, backgroundColor: this.bgColor()}}>
      {this.isWinning()?this.renderWinning():this.renderLost()}
      <button onClick={this.props.actions.reset}>НОВО ТЕГЛЕНЕ</button>
    </div>;
  }
}
export default Final;
