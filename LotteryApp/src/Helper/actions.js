import {getRandomNumber,getRandomColor} from './utils';

function removeDublicates(data) {
  return data.filter((value, index) => data.indexOf(value) === index);
}
export function registerTicket() {
  const newTicket = {
    number: getRandomNumber(),
    color: getRandomColor(),
  };

  this.setState((prevState) => {
    prevState.tickets.push(newTicket);

    return {
      tickets: removeDublicates(prevState.tickets),
      remainingTickets: prevState.remainingTickets--,
    };
  });
}
