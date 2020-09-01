import React, {Component} from 'react';

class LotteryTicket extends Component {
  render() {
    const {color, number} = this.props;
    return (
      <div
        style={{
          backgroundColor: color,
          padding: 10,
          width: '60%',
          margin: 'auto',
        }}
      >
        <button style={{float: 'left'}}> X </button>
        <small>
          Твоето число е: <b>{number}</b>
        </small>
      </div>
    );
  }
}
export default LotteryTicket;
