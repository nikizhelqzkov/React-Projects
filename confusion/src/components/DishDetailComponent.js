import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  renderDish(dish) {
    if (dish) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  renderComments(dish) {
    if (dish) {
      const comment = dish.comments.map((com) => {
        const date = new Date(com.date)
        const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' });
        return (
            <ul key={com.id} className='list-unstyled'>
                <li>{com.comment}</li>
                <br/>
                <li>-- {com.author} , {dateTimeFormat.format(date)}</li>
            </ul>
        );
      });
      return (
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {comment}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderDish(this.props.dish)}
        {this.renderComments(this.props.dish)}
      </div>
    );
  }
}

export default DishDetail;
